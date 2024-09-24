"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";

const signUpMarkdown = `~~~tsx
const { data, error } = await supabase
  .auth
  .signUp({
    email,
    password,
  });
~~~
`;

const SignUpExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Sign up user">
      <CodeBlock markdown={signUpMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default SignUpExample;
