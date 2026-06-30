import { useAuthors } from "../hooks/useAuthors";
import AuthorBirthdayForm from "./AuthorBirthdayForm";

const Authors = ({ show, token }) => {
  const authorsResult = useAuthors();

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
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <AuthorBirthdayForm authorsResult={authorsResult} />}
    </div>
  );
};

export default Authors;
