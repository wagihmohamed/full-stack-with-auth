import { useQuery, queryOptions } from "@tanstack/react-query";
import { CATEGORIES_SERVICE } from "@/services/categoriesServices";
import { useSession } from "@/lib/auth";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: CATEGORIES_SERVICE.getCategories,
});

export const useCategories = () => {
  const { data } = useSession();

  return useQuery({
    ...categoriesQueryOptions,
    enabled: !!data,
  });
};
