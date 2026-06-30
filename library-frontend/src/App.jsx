import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import AuthorBirthdayForm from "./components/AuthorBirthdayForm";
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  const handleLogout = () => {
    (localStorage.removeItem("library-user-token"), setToken(""));
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === "authors"} authorsResult={authorsResult}>
        {token && <AuthorBirthdayForm authorsResult={authorsResult} />}
      </Authors>

      <Books show={page === "books"} booksResult={booksResult} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login" && !token} setToken={setToken} />
    </div>
  );
};

export default App;
