import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import GenresFilter from "./GenresFilter";

const Books = ({ show }) => {
  const [filter, setFilter] = useState("");
  const booksResult = useBooks(filter);

  if (!show) return null;
  if (booksResult.loading) return <div>loading...</div>;

  const books = booksResult.data?.allBooks ?? [];

  return (
    <div>
      <h2>books</h2>
      {filter && <h3>in genre</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenresFilter setFilter={setFilter} />
    </div>
  );
};

export default Books;
