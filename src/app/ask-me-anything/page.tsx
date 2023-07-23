'use client';

import { useChat } from 'ai/react';
import AIButton from '../components/AIButton';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import Chat from '../components/Chat';
import ChatScrollAnchor from '../components/ChatScrollAnchor';
import InfoBox from '../components/InfoBox';

export default function AMA() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === '') return;

    handleSubmit(e);
    setInput('');
  };

  return (
    <main className="relative z-10 flex flex-col flex-1">
      <svg
        width="104"
        height="100"
        viewBox="0 0 104 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-14 right-[280px] z-0 w-20 h-20 rotate-45"
      >
        <path
          d="M22.9357 1.53592C16.4357 3.67912 11.1429 7.22006 7.89286 11.5065C-1.11429 23.3407 -2.32143 39.2749 4.73571 52.9727L6.40714 56.4205L3.25 58.9364C1.48571 60.241 0 62.0115 0 62.9433C0 63.7819 2.87857 67.2297 6.40714 70.6774C16.25 80.4616 22.3786 80.3684 24.1429 70.4911C24.8857 66.5774 23.8643 52.2273 22.75 51.2023C22.4714 50.9227 20.0571 51.3886 17.2714 52.2273C14.5786 53.0659 11.9786 53.8114 11.4214 53.8114C10.8643 53.8114 9.47143 51.575 8.26429 48.8727C5.10714 41.884 5.10714 28.4657 8.26429 21.477C10.7714 15.7929 16.0643 10.6678 22.1929 7.77915C28.7857 4.79731 40.6714 4.98367 46.9857 8.33825C52.4643 11.2269 57.2 15.0474 58.5929 17.6565C59.4286 19.1474 58.7786 20.1724 54.5071 24.4588C51.4429 27.4407 48.1929 31.9135 46.3357 35.6408C43.6429 41.2317 43.2714 42.8158 43.2714 49.525C43.3643 61.0796 47.3571 66.857 55.3429 66.857C69.3643 66.857 78.9286 41.2317 70.85 25.4839C68.9929 21.9429 70.2 20.9179 76.9786 20.452C81.4357 20.1724 83.2 20.452 86.0786 22.0361C93.2286 26.1361 97.3143 36.1067 98.15 51.6682C98.8 63.5024 97.4071 69.7456 90.4429 86.7049C85.0571 99.7504 84.8714 103.757 90.0714 96.2095C94.3429 89.9663 100.193 76.8275 102.236 68.8138C103.35 64.341 104 58.7501 104 52.9727C103.907 23.8066 91.1857 9.45644 70.1071 14.7679L65.9286 15.7929L60.45 10.6678C52.3714 3.2132 46.0571 0.417728 36.2143 0.0449972C30.2714 -0.141368 26.9286 0.231363 22.9357 1.53592ZM66.3 30.2362C69.4571 39.4613 67.2286 50.8295 61.1929 56.8864C58.5 59.5887 57.0143 60.4274 55.0643 60.1478C49.4 59.4955 47.9143 48.1272 52.1857 38.7158C54.6 33.4976 61.3786 25.8566 63.6071 25.8566C64.2571 25.8566 65.4643 27.8134 66.3 30.2362Z"
          fill="black"
        />
      </svg>
      <div className="max-w-3xl mx-auto flex flex-col w-full px-4">
        <div className="flex flex-col mt-4 max-w-3xl pb-[200px]">
          {messages.length === 0 ? (
            <InfoBox />
          ) : (
            <div className="flex flex-col">
              <Chat messages={messages} />
              <ChatScrollAnchor track={true} />
            </div>
          )}
        </div>
        <div className="fixed z-10 mx-auto border border-black/10 max-w-3xl w-full inset-x-0 bottom-2 overflow-hidden p-3 grow rounded-xl bg-white">
          <form onSubmit={onSubmit} className="flex items-center">
            <TextareaAutosize
              ref={inputRef}
              minRows={2}
              autoFocus
              value={input}
              placeholder="Ask me anything..."
              onChange={handleInputChange}
              className="pr-4 pl-2 outline-none bg-transparent rounded-md w-full resize-none text-slate-900"
            />

            <AIButton isLoading={isLoading} label="Ask" hueValue={0} />
          </form>
        </div>
      </div>
    </main>
  );
}
