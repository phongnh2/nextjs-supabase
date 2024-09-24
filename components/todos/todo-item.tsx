"use client";

import { ChangeEvent, useState } from "react";
import { Checkbox, Input, Button, Card } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { ITodo, TodoStatus } from "@/interfaces/todo";
import { PencilIcon, SaveAllIcon, Trash, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

interface ITodoItemProps {
  todo: ITodo;
  onUpdate: (todo: ITodo) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onUpdate, onDelete }: ITodoItemProps) => {
  const supabase = createClient();

  const [note, setNote] = useState(todo.note);
  const [status, setStatus] = useState(todo.status);

  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.IN_PROGRESS;
    setStatus(() => newStatus);
    const { data, error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", todo.id).select();

    if (error) {
      toast.error(error.message ?? "Failed to check todo");
      console.error(error);
    } else {
      onUpdate(data[0]);
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ note, status })
      .eq("id", todo.id).select();

    if (error) {
      toast.error(error.message ?? "Failed to update todo");
      console.error(error);
    } else {
      onUpdate(data[0]);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);

    if (error) {
      toast.error(error.message ?? "Failed to delete todo");
      console.error(error);
    } else {
      onDelete(todo.id);
    }
  }

  return (
    <div className="flex gap-1 align-middle content-center items-center">
      <Checkbox
        color="success"
        defaultSelected={status === TodoStatus.COMPLETED}
        onChange={handleCheck}
      />
      <Input value={note} onChange={(e) => setNote(e.target.value)} />
      <Button
        size="sm"
        variant="light"
        isIconOnly
        color="warning"
        aria-label="update"
        onClick={handleUpdate}
      >
        <SaveAllIcon />
      </Button>
      <Button
        size="sm"
        variant="light"
        isIconOnly
        color="danger"
        aria-label="update"
        onClick={handleDelete}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default TodoItem;
