import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export const useCustomMutation = (url: string, queryKey: any, method: any) => {
  const queryClient = useQueryClient();
  const { data, isLoading, mutate } = useMutation(
    (suggest: any) => {
      return axios(`http://localhost:4000${url}`, {
        headers: { 'Content-Type': 'application/json' },
        method: method,
        data: suggest,
      }, 
      )
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

