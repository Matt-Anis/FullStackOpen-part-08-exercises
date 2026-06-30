import { useState } from "react";
import { useChangeAuthorBirthday } from "../hooks/useAuthors";

const AuthorBirthdayForm = ({ authorsResult }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const { changeBirthYear } = useChangeAuthorBirthday();

  const handleSubmit = (event) => {
    event.preventDefault();

    changeBirthYear(name, parseInt(birthYear));

    setName("");
    setBirthYear("");
  };

  if (authorsResult.loading) {
    return null;
  }

  const authors = authorsResult?.data?.allAuthors ?? [];

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="number"
              required
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit" name="update author">
            update author
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorBirthdayForm;
