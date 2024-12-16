import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Todo } from "@/services/todosServices";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const { mutate: deleteTodoAction, isPending } = useDeleteTodo();
  const { mutate: updateTodo, isPending: isUpdateTodoPending } =
    useUpdateTodo();
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (todoToDelete !== null) {
      deleteTodoAction(todoToDelete, {
        onSuccess: () => {
          setTodoToDelete(null);
        },
      });
    }
  };

  const handleToggleTodo = (todo: Todo) => {
    updateTodo({
      id: todo.id,
      todo: {
        completed: !todo.completed,
      },
    });
  };

  return (
    <>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <Checkbox
              checked={todo.completed}
              disabled={isUpdateTodoPending}
              onCheckedChange={() => {
                handleToggleTodo(todo);
              }}
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            {todo.category && (
              <Badge variant="secondary" className="ml-auto mr-2">
                {todo.category.name}
              </Badge>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                handleDeleteClick(todo.id);
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <AlertDialog
        open={todoToDelete !== null}
        onOpenChange={() => setTodoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this todo?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              todo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
