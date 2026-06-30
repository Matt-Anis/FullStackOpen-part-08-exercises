import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = ({ show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const { login } = useAuth();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      setPassword("");
      setUsername("");
    } catch {
      setNotification("login failed");
      setTimeout(() => setNotification(""), 5000);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <span>{notification}</span>
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
