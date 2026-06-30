import { makeVar } from "@apollo/client";
import {
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client/react";
import { LOGIN } from "../queries";

const TOKEN_KEY = "library-user-token";
const tokenVar = makeVar(localStorage.getItem(TOKEN_KEY));

export const useAuth = () => {
  const client = useApolloClient();
  const token = useReactiveVar(tokenVar);
  const [handleLogin, loginResult] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const newToken = data.login.value;
      localStorage.setItem(TOKEN_KEY, newToken);
      tokenVar(newToken);
    },
  });

  const login = (username, password) => {
    return handleLogin({ variables: { username, password } });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    tokenVar(null);
    client.cache.evict({ fieldName: "me" });
    client.cache.gc();
  };

  return { token, login, logout, loginResult };
};
