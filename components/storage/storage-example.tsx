"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";

const queryMarkdown = `~~~ts
const { data, error } = await supabase.storage
    .from("lumin")
    .list("assets", {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
~~~
`;

const uploadMarkdown = `~~~ts
const { data, error } = await supabase.storage
      .from("lumin")
      .upload('file_path', file);
~~~
`;

const StorageExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Query storage">
      <CodeBlock markdown={queryMarkdown} />
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Upload file">
      <CodeBlock markdown={uploadMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default StorageExample;
