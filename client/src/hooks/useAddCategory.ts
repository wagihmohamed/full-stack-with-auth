import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { CATEGORIES_SERVICE } from "@/services/categoriesServices";
import { categoriesQueryOptions } from "./useCategories";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CATEGORIES_SERVICE.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(categoriesQueryOptions);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while adding the category.",
      });
    },
  });
};
