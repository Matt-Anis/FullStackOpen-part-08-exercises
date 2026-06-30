import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CHANGE_BIRTHDAY, ALL_AUTHORS } from "../queries";

const AuthorBirthdayForm = ({ authorsResult }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [changeBirthYear] = useMutation(CHANGE_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    changeBirthYear({ variables: { name, setBornTo: parseInt(birthYear) } });

    setName("");
    setBirthYear("");
  };

  if (authorsResult.loading) {
    return null;
  }

  const authors = authorsResult?.data?.allAuthors ?? [];

  return (
    <div>
      <h2>Set brithYear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select value={name} onChange={(e) => setName(e.target.value)}>
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
            birthyear
            <input
              type="number"
              required
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <button type="submit">change</button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default AuthorBirthdayForm;
