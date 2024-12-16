import { api } from "@/api";
import { Category } from "./categoriesServices";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category: Category;
}

const getTodos = async () => {
  const { data } = await api.get<Todo[]>("/todos");
  return data;
};

const deleteTodo = async (id: string) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};

const updateTodo = async (id: string, todo: Partial<Todo>) => {
  const response = await api.patch<Todo>(`/todos/${id}`, todo);
  return response.data;
};

const addTodo = async (todo: Partial<Todo>) => {
  const response = await api.post<Todo>("/todos", todo);
  return response.data;
};

export const TODOS_SERVICE = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
