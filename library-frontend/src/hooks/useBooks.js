import { useQuery, useMutation } from "@apollo/client/react";
import { ALL_BOOKS, ADD_BOOK, ALL_AUTHORS } from "../queries";

export const useBooks = (genre) =>
  useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  });

export const useAddBook = () => {
  const [addBookMutation, result] = useMutation(ADD_BOOK);
  const addBook = (title, author, published, genres) =>
    addBookMutation({
      variables: { title, author, published, genres },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    });
  return { addBook, result };
};
