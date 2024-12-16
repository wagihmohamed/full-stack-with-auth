import { toast } from "@/hooks/use-toast";
import { signOut } from "@/lib/auth";
import { queryClient } from "@/main";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthenticated");

      toast({
        title: "Unauthenticated",
        description: "You are not authenticated. Redirecting to login...",
        variant: "destructive",
      });
      signOut();
      queryClient.clear();
    }

    return Promise.reject(error);
  }
);
