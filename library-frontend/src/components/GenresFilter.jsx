import { useQuery } from "@apollo/client/react";
import ALL_BOOKS from "../queries";

const GenresFilter = ({ setFilter }) => {
  const booksResult = useQuery(ALL_BOOKS);
  if (booksResult.loading) {
    return null;
  }

  const books = booksResult.data.allBooks ?? [];
  const allGenres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <div>
      <button onClick={() => setFilter("")}>All</button>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenresFilter;
