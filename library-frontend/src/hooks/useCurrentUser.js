import { useQuery } from "@apollo/client/react";
import { ME } from "../queries";
import { useAuth } from "./useAuth";

export const useCurrentUser = () => {
  const { token } = useAuth();
  return useQuery(ME, { skip: !token });
};
