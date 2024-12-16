import { useQuery, queryOptions } from "@tanstack/react-query";
import { TODOS_SERVICE } from "@/services/todosServices";

export const todosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: TODOS_SERVICE.getTodos,
});

export const useTodos = () => {
  return useQuery(todosQueryOptions);
};
