import { useQuery } from "@tanstack/react-query";


export const useCustomQuery = (url:string, queryKey:any) => {
  const { data, isLoading, error, status, refetch } = useQuery(
    [queryKey],
    () =>
      fetch(`http://localhost:3001${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "AutHorization": localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        return res.json();
      }),
    { keepPreviousData: false }
  );

  return { data, isLoading, error, status, refetch };
};
