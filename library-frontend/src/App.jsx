import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useAuth } from "./hooks/useAuth";
import { useBookSubscription } from "./hooks/subscriptions/useBookSubscription";
import { useSubscription, useApolloClient } from "@apollo/client/react";
import { BOOK_ADDED } from "./queries";
import { addBookToCache, addAuthorToCache } from "./utils/apolloCache";

const App = () => {
  const { token, logout } = useAuth();
  const [page, setPage] = useState("authors");
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

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} />

      <LoginForm show={page === "login" && !token} />
    </div>
  );
};

export default App;
