"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";

const signOutMarkdown = `~~~tsx
await supabase.auth.signOut();
~~~
`;

const SignOutExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Sign in user">
      <CodeBlock markdown={signOutMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default SignOutExample;
