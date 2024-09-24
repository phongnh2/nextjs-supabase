"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import CodeBlock from "../tutorial/code-block";
import dynamic from "next/dynamic";

const subscribeMarkdown = `~~~ts
const [messages, setMessages] = useState<IMessage[]>([])

useEffect(() => {
  const subscription = supabase
    .channel('public:messages')
    .on('postgres_changes', { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'messages' 
    }, payload => {
      setMessages(current => [...current, payload.new as IMessage])
    })
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [])
~~~
`;

const sendMarkdown = `~~~ts
const { error } = await supabase
  .from('messages')
  .insert({ content, nickname: user.nickname, user_id: user.userId })
~~~
`;

const ChatCodeExample = () => (
  <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Subscribe channel">
      <CodeBlock markdown={subscribeMarkdown} />
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Send message (event)">
      <CodeBlock markdown={sendMarkdown} />
    </AccordionItem>
  </Accordion>
);

export default ChatCodeExample;
