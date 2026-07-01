const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) return Book.collection.countDocuments();
      return Book.countDocuments({ author: args.author });
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return Book.find({
          author: { $eq: args.author },
          genres: args.genre,
        }).populate("author");
      }
      if (args.author && !args.genre) {
        return Book.find({
          author: { $eq: args.author },
        }).populate("author");
      }
      if (!args.author && args.genre) {
        return Book.find({
          genres: args.genre,
        }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      if (args.title.length < 3) {
        throw new GraphQLError("title min length is 3", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalideArgs: args.title,
          },
        });
      }
      if (args.title.author < 3) {
        throw new GraphQLError("author name min length is 3", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalideArgs: args.author,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({ ...args, author: author._id });
      const result = await book.save();

      pubsub.publish("BOOK_ADDED", { bookAdded: result });

      return result.populate("author");
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true },
      );
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError("_resetDatabase is only available in test mode");
      }
      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});
      return true;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
