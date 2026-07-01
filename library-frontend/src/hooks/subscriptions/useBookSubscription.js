import { useSubscription, useApolloClient } from "@apollo/client/react";
import { BOOK_ADDED } from "../../queries";
import { addBookToCache, addAuthorToCache } from "../../utils/apolloCache";

export const useBookSubscription = () => {
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("new book recieved!");
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      addBookToCache(client.cache, addedBook);
      addAuthorToCache(client.cache, addedBook?.author);
    },
    onError: (error) => {
      console.log("subscription error:", error);
    },
    onComplete: () => {
      console.log("subscription completed/closed");
    },
  });
};
