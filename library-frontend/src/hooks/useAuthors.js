import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, CHANGE_BIRTHDAY } from "../queries";

export const useAuthors = () => useQuery(ALL_AUTHORS);

export const useChangeAuthorBirthday = () => {
  const [changeBirthDayMutation] = useMutation(CHANGE_BIRTHDAY);

  const changeBirthYear = (name, setBornTo) =>
    changeBirthDayMutation({
      variables: { name, setBornTo },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });
  return { changeBirthYear };
};
