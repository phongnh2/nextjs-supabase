import React from "react";
import Message from "./message";
import { IMessage, IUser } from "@/interfaces/message";
import { dayjs } from "@/lib/dayjs";

interface MessageGroupProps {
  messages: IMessage[];
  currentUser: IUser;
  isCurrentUser: boolean;
}

const MessageGroup: React.FC<MessageGroupProps> = ({
  messages,
  currentUser,
  isCurrentUser,
}) => {
  if (messages.length === 0) return null;

  return (
    <div className={`mb-4 ${isCurrentUser ? "text-right" : "text-left"}`}>
      <div>
        {isCurrentUser && <span className="text-sm italic text-zinc-500 mr-2">({dayjs(messages[0].created_at).fromNow()})</span>}
        <span className="mb-2 font-extrabold">{isCurrentUser ? currentUser.nickname : messages[0].nickname}</span>
        {!isCurrentUser && <span className="text-sm italic text-zinc-500 ml-2">({dayjs(messages[0].created_at).fromNow()})</span>}
      </div>
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          nickname={message.nickname}
          currentUser={currentUser}
          isCurrentUser={isCurrentUser}
        />
      ))}
    </div>
  );
};

export default MessageGroup;
