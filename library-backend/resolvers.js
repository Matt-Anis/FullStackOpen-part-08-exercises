const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: (root, args) => {
      if (!args.author) return Book.collection.countDocuments();
      return Book.countDocuments({ author: args.author });
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author && args.genres) {
        return Book.find({
          author: { $eq: args.author },
          genres: { $eq: args.genres },
        });
      }
      if (args.author && !args.genres) {
        return Book.find({
          author: { $eq: args.author },
        });
      }
      if (!args.author && args.genres) {
        return Book.find({
          genres: { $eq: args.genres },
        });
      }
      return Book.find({});
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      await Book.countDocuments({ author: { $eq: args.author } });
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      if (!authors.find((author) => author.name === book.author)) {
        authors = authors.concat({ name: book.author, id: uuid() });
      }

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return null;
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === updatedAuthor.name ? updatedAuthor : author,
      );
      return updatedAuthor;
    },
  },
};

module.exports = resolvers;
