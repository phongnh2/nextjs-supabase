"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";

const queryMarkdown = `~~~ts
const { data, error } = await supabase
  .from("todos")
  .select("*")
  .order("id", { ascending: false });
~~~
`;

const insertMarkdown = `~~~ts
const { data, error } = await supabase
  .from("todos")
  .insert({ note: newNote, status: false })
  .select();
~~~
`;

const updateMarkdown = `~~~ts
const { data, error } = await supabase
  .from("todos")
  .update({ status: newStatus })
  .eq("id", todo.id)
  .select();
~~~
`;

const deleteMarkdown = `~~~ts
const { error } = await supabase
  .from("todos")
  .delete()
  .eq("id", todo.id);
~~~
`;

const TodoCodeExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Query entities">
      <CodeBlock markdown={queryMarkdown} />
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Insert entity">
      <CodeBlock markdown={insertMarkdown} />
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="Update entity">
      <CodeBlock markdown={updateMarkdown} />
    </AccordionItem>
    <AccordionItem key="4" aria-label="Accordion 3" title="Delete entity">
      <CodeBlock markdown={deleteMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default TodoCodeExample;
