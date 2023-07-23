import { Message } from 'ai';
import React, { FC } from 'react';
import ChatMessage from './ChatMessage';

type ChatProps = {
  messages: Message[];
};

const Chat: FC<ChatProps> = ({ messages }) => {
  return (
    <div className="flex flex-col mt-4 max-w-3xl overflow-x-hidden overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Chat;
