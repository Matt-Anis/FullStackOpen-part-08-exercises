const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) return Book.collection.countDocuments();
      return Book.countDocuments({ author: args.author });
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        return Book.find({
          author: { $eq: args.author },
          genres: { $all: args.genres },
        }).populate("author");
      }
      if (args.author && !args.genres) {
        return Book.find({
          author: { $eq: args.author },
        }).populate("author");
      }
      if (!args.author && args.genres) {
        return Book.find({
          genres: { $all: args.genres },
        }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({ ...args, author: author._id });
      const result = await book.save();
      return result.populate("author");
    },
    editAuthor: async (root, args) => {
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true },
      );
    },
  },
};

module.exports = resolvers;
