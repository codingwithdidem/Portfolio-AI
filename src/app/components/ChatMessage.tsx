import { Message } from 'ai';
import React from 'react';
import { BotIcon, User2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyToClipboard from './CopyToClipboard';
import AI from './icons/AI';

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  const isAiMessage = message.role === 'assistant';

  return (
    <div className="group relative mb-4 flex items-start">
      {isAiMessage ? <AI className="w-6 h-6" /> : <User2 className="w-6 h-6" />}

      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <ReactMarkdown
          className="prose prose-purple"
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </ReactMarkdown>
      </div>

      <CopyToClipboard text={message.content} />
    </div>
  );
}
