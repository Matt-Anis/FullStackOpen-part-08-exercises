import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";

export const useAuthors = () => useQuery(ALL_AUTHORS);
