import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CHANGE_BIRTHDAY, ALL_AUTHORS } from "../queries";

const AuthorBirthdayForm = () => {
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

  return (
    <div>
      <h2>Set brithYear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <input
              type="text"
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
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
