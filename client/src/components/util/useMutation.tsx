import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCustomMutation = (url: string, queryKey: any, method: any, onSuccess:any) => {
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
    {
      // onSuccess: () => queryClient.invalidateQueries(queryKey),
      onSuccess: onSuccess ? (res) => {
        queryClient.invalidateQueries(queryKey);
        onSuccess(res); // 추가적인 로직 수행
      } : () => queryClient.invalidateQueries(queryKey),
      onError: () => queryClient.invalidateQueries(queryKey),
    }
  );

  return { data, isLoading, mutate };
};
