import { api } from "@/api";

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const getCategories = async () => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};

const addCategory = async (category: Partial<Category>) => {
  const response = await api.post<Category>("/categories", category);
  return response.data;
};

export const CATEGORIES_SERVICE = {
  getCategories,
  addCategory,
};
