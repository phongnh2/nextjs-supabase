"use client";

import { useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { ITodo } from "@/interfaces/todo";
import TodoItem from "./todo-item";
import toast from "react-hot-toast";

const TodoList = ({ initialTodos }: { initialTodos: ITodo[] }) => {
  const supabase = createClient();
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [newNote, setNewNote] = useState("");

  const handleCreate = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert({ note: newNote, status: false })
      .select();
    if (error) {
      toast.error(error.message ?? "Failed to add todo");
      console.error(error);
    } else {
      setTodos([...todos, data[0]]);
      setNewNote("");
      toast.success("Todo created");
    }
  };

  const handleUpdate = (updatedTodo: ITodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
    toast.success("Todo updated");
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted");
  };

  return (
    <>
      <div className="flex gap-3 w-full">
        <Input
          value={newNote}
          variant="bordered"
          color="success"
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="⭐️ New todo..."
        />
        <Button
          onClick={handleCreate}
          color="success"
        >
          Add Todo
        </Button>
      </div>
      <Divider className="my-5" />
      <div className="flex flex-col gap-5">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
