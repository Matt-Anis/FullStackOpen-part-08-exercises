import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { token, logout } = useAuth();
  const [page, setPage] = useState("authors");

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
