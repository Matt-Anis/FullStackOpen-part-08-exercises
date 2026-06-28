import AuthorBirthdayForm from "./AuthorBirthdayForm";

const Authors = ({ show, authorsResult }) => {
  if (!show) {
    return null;
  }

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }

  const authors = authorsResult?.data?.allAuthors ?? [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthdayForm authors={authors} />
    </div>
  );
};

export default Authors;
