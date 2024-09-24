"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";

const signInMarkdown = `~~~tsx
const { data, error } = await supabase
  .auth
  .signInWithPassword({
    email,
    password,
  });
~~~
`;

const SignInExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Sign in user">
      <CodeBlock markdown={signInMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default SignInExample;
