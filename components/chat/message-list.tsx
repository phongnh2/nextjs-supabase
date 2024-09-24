import React, { useRef, useEffect } from "react";
import MessageGroup from "./message-group";
import { IMessage, IUser } from "@/interfaces/message";

interface MessageListProps {
  messages: IMessage[];
  currentUser: IUser;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const groupMessages = (messages: IMessage[]) => {
    if (messages.length === 0) return [];

    const groupedMessages: { user_id: string; messages: IMessage[] }[] = [];
    let currentGroup: { user_id: string; messages: IMessage[] } = {
      user_id: messages[0].user_id,
      messages: [],
    };

    messages.forEach((message, index) => {
      if (
        index === 0 ||
        (message.user_id === currentGroup.user_id &&
          new Date(message.created_at).getTime() -
            new Date(messages[index - 1].created_at).getTime() <
            360000)
      ) {
        currentGroup.messages.push(message);
      } else {
        groupedMessages.push(currentGroup);
        currentGroup = { user_id: message.user_id, messages: [message] };
      }
    });
    groupedMessages.push(currentGroup);

    return groupedMessages;
  };

  const groupedMessages = groupMessages(messages);

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]"
    >
      {groupedMessages.map((group, index) => (
        <React.Fragment key={index}>
          <MessageGroup
            messages={group.messages}
            currentUser={currentUser}
            isCurrentUser={currentUser.userId === group.user_id}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;