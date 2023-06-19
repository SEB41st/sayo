import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCustomMutation = (url:string, queryKey:any, method:any, onSuccess:any) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (suggest:any) => {
      return axios(`http://sayo.n-e.kr:8080${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        method: method,
        data: suggest,
      });
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(queryKey);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: () => queryClient.invalidateQueries(queryKey),
    }
  );

  return { mutate, isLoading };
};
