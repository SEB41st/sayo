import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCustomMutation = (url: string, queryKey: any, method: any) => {
  const queryClient = useQueryClient();
  const { data, isLoading, mutate } = useMutation(
    (suggest: any) => {
      return axios(`http://sayo.n-e.kr:8080${url}`, {
        headers: {
          "Content-Type": "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
        method: method,
        data: suggest,
      });
    },
    // {
    //   onSuccess: () => queryClient.invalidateQueries(queryKey),
    // },
    {
      onError: () => queryClient.invalidateQueries(queryKey),
    }
  );

  return { data, isLoading, mutate };
};
