import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = ({ show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const submit = (event) => {
    event.preventDefault();
    try {
      login(username, password);
    } catch (error) {
      console.error(error);
    }
    setPassword("");
    setUsername("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
