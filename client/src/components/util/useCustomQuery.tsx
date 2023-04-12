import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface OutPut {
  data: any;
  isLoading: boolean;
  error: string | null | unknown;
  status: string;
  refetch: () => void;
}


export const useCustomQuery = (url: string, queryKey: string) : OutPut => {
  const { data, isLoading, error, status, refetch } = useQuery(
    [queryKey],
    () =>
    axios(`http://sayo.n-e.kr:8080${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:  localStorage.getItem("accessToken")
          // Authorization: localStorage.getItem("Authorization")
        },
      }).then((res) => {
        return res.data;
      }),
    { keepPreviousData: false }
  );

  return { data, isLoading, error, status, refetch };
};
