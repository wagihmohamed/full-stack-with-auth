import { useQuery, queryOptions } from "@tanstack/react-query";
import { TODOS_SERVICE } from "@/services/todosServices";
import { useSession } from "@/lib/auth";

export const todosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: TODOS_SERVICE.getTodos,
});

export const useTodos = () => {
  const { data } = useSession();
  return useQuery({
    ...todosQueryOptions,
    enabled: !!data,
  });
};
