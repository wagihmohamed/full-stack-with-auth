import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODOS_SERVICE } from "@/services/todosServices";
import { toast } from "./use-toast";
import { todosQueryOptions } from "./useTodos";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TODOS_SERVICE.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(todosQueryOptions);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while adding the todo.",
      });
    },
  });
};
