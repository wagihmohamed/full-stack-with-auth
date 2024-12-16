import { useQuery, queryOptions } from "@tanstack/react-query";
import { CATEGORIES_SERVICE } from "@/services/categoriesServices";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: CATEGORIES_SERVICE.getCategories,
});

export const useCategories = () => {
  return useQuery(categoriesQueryOptions);
};
