import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomMutation = (url:any, queryKey:any, method:any) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (suggest:any) => {
      return fetch(`http://localhost:3001${url}`, {
        body: JSON.stringify(suggest),
        headers: {
          "Content-Type": "application/json",
        //   AutHorization: localStorage.getItem("accessToken"),
        },
        method: method,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
    // {
    //   onError: () => queryClient.invalidateQueries(queryKey),
    // },
    // {
    //   onSettled: (data, error, variables, context) => {
    //   // mutation이 완료되면 성공 유무와 관계없이 쿼리를 무효화 시키고 새로 갱신
    //   queryClient.invalidateQueries(queryKey);
    // }},
  );

  return { mutate };
};
