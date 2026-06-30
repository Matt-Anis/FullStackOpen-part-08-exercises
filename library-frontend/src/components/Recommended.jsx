import { useBooks } from "../hooks/useBooks";
import { useCurrentUser } from "../hooks/useCurrentUser";

const Recommended = ({ show }) => {
  const currentUser = useCurrentUser();
  const booksResult = useBooks();
  if (!show || !currentUser) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data?.allBooks ?? [];
  const filtredBooks = books.filter((book) =>
    book.genres.includes(currentUser.data.me.favoriteGenre),
  );

  return (
    <div>
      <h1>recommendations</h1>
      <h2>books in your favorite genre </h2>
      <h3>{currentUser.data.me.favoriteGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
