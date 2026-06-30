import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import GenresFilter from "./GenresFilter";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const [filter, setFilter] = useState("");
  const booksResult = useQuery(ALL_BOOKS, {
    variables: filter ? { genre: filter } : {},
  });

  if (!show) return null;
  if (booksResult.loading) return <div>loading...</div>;

  const books = booksResult.data?.allBooks ?? [];

  return (
    <div>
      <h2>books</h2>
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
