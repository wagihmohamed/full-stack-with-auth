import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from "./lib/auth";
import { LoadingErrorPlaceholder } from "./components/LoadingErrorPlaceholder";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import { useTodos } from "./hooks/useTodos";
import { useCategories } from "./hooks/useCategories";

function App() {
  const { data, isPending, error } = useSession();

  const { data: todosData = [] } = useTodos();
  const { data: categoriesData = [] } = useCategories();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4">Todo App</h1>
          <LoadingErrorPlaceholder isLoading={isPending} error={error?.message}>
            {!isPending && !data && (
              <Alert className="mb-4">
                <AlertDescription>
                  You are not logged in. Your todos will not be saved to the
                  database.
                </AlertDescription>
              </Alert>
            )}
            <TodoForm categories={categoriesData} />
            <TodoList todos={todosData} />
          </LoadingErrorPlaceholder>
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
