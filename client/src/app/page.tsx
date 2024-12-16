import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

interface Todo {
  id: number
  text: string
  completed: boolean
  category: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string, category: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false, category }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList todos={todos} onToggleTodo={toggleTodo} />
      </main>
    </div>
  )
}

