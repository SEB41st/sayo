import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useCustomQuery = (url: string, queryKey: string) => {
  const { data, isLoading, error, status, refetch } = useQuery(
    [queryKey],
    () =>
    axios(`http://sayo.n-e.kr:8080${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization:  localStorage.getItem("accessToken")
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`
          ,
        },
      }).then((res) => {
        return res.data;
      }),
    { keepPreviousData: false }
  );

  return { data, isLoading, error, status, refetch };
};
