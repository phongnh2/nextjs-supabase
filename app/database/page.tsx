import TodoCodeExample from "@/components/todos/todo-example";
import TodoList from "@/components/todos/todo-list";
import { createClient } from "@/utils/supabase/server";
import { Divider } from "@nextui-org/react";
import toast from "react-hot-toast";

export const revalidate = 0; // Fetch data on every request

const getTodos = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    console.error(error);
    toast.error(error.message ?? "Failed to fetch todos");
    return [];
  }
  return data;
};

export default async function Database() {
  const todos = await getTodos();

  return (
    <div className="grid grid-cols-8 gap-20">
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Todo list 📒</h1>
        <Divider className="my-5" />
        <TodoList initialTodos={todos} />
      </div>
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Preview code</h1>
        <TodoCodeExample />
      </div>
    </div>
  );
}
