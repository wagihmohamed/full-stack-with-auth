import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category } from "@/services/categoriesServices";
import { useAddCategory } from "@/hooks/useAddCategory";
import { useAddTodo } from "@/hooks/useAddTodo";
import { toast } from "@/hooks/use-toast";

interface TodoFormProps {
  categories: Category[];
}

export default function TodoForm({ categories }: TodoFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const { mutate: addNewCategory, isPending: isAddCategoryPending } =
    useAddCategory();

  const { mutate: addNewTodo, isPending: isAddNewTodoPending } = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && category) {
      addNewTodo(
        {
          title: text.trim(),
          categoryId: category,
        },
        {
          onSuccess: () => {
            setText("");
            setCategory("");
          },
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Category name cannot be empty",
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addNewCategory(
        { name: newCategory.trim() },
        {
          onSuccess: () => {
            setNewCategory("");
            setIsAddCategoryOpen(false);
            setCategory(newCategory.trim());
          },
        }
      );
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === "add_new") {
      setIsAddCategoryOpen(true);
    } else {
      setCategory(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new todo"
          className="flex-grow"
        />
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add_new">Add new category</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button disabled={isAddNewTodoPending} type="submit">
          Add Todo
        </Button>
      </form>

      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
          />
          <DialogFooter>
            <Button disabled={isAddCategoryPending} onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
