import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import AuthorBirthdayForm from "./components/AuthorBirthdayForm";
import Recommended from "./components/Recommended";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";

const App = () => {
  const client = useApolloClient();

  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const currentUser = useQuery(ME, { skip: !token });

  const handleLogout = () => {
    localStorage.removeItem("library-user-token");
    setToken("");
    client.cache.evict({ fieldName: "me" });
    client.cache.gc();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === "authors"} authorsResult={authorsResult}>
        {token && <AuthorBirthdayForm authorsResult={authorsResult} />}
      </Authors>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended
        show={page === "recommended"}
        currentUser={currentUser}
        booksResult={booksResult}
      />

      <LoginForm show={page === "login" && !token} setToken={setToken} />
    </div>
  );
};

export default App;
