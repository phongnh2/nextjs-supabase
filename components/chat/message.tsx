import { IUser } from '@/interfaces/message';
import { Chip } from '@nextui-org/react';
import React from 'react';

interface MessageProps {
  content: string;
  nickname: string;
  isCurrentUser: boolean;
  currentUser: IUser;
}

const Message: React.FC<MessageProps> = ({
  content,
  isCurrentUser,
}) => {
  return (
    <div className={`mb-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
      <Chip className="rounded-sm" color={isCurrentUser ? 'success' : 'default'}>
        {content}
      </Chip>
    </div>
  );
};

export default Message;
