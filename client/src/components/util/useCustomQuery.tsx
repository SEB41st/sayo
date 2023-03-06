import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useCustomQuery = (url: string, queryKey: string) => {
  const { data, isLoading, error, status, refetch } = useQuery(
    [queryKey],
    () =>
    axios(`http://localhost:4000${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AutHorization": localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        return res.data;
      }),
    { keepPreviousData: false }
  );

  return { data, isLoading, error, status, refetch };
};
