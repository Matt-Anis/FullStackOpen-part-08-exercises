import { useBooks } from "../hooks/useBooks";

const GenresFilter = ({ setFilter }) => {
  const booksResult = useBooks();
  if (booksResult.loading) {
    return null;
  }

  const books = booksResult.data.allBooks ?? [];
  const allGenres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <div>
      <button onClick={() => setFilter("")}>all genres</button>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenresFilter;
