const Recommended = ({ show, booksResult, currentUser }) => {
  if (!show || !currentUser) {
    return null;
  }
  console.log(currentUser);

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data?.allBooks ?? [];
  const filtredBooks = books.filter((book) =>
    book.genres.includes(currentUser.data.me.favoriteGenre),
  );

  return (
    <div>
      <h2>books for your favorite genre {currentUser.data.me.favoriteGenre}</h2>
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
