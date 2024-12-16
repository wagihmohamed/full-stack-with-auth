import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, TODOS_SERVICE } from "@/services/todosServices";
import { toast } from "./use-toast";
import { todosQueryOptions } from "./useTodos";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; todo: Partial<Todo> }) =>
      TODOS_SERVICE.updateTodo(data.id, data.todo),
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
