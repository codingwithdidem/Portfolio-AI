import matter from 'gray-matter';
import React, { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

const faqs = [
  {
    question: 'What is AMA? 🤔',
    answer:
      matter(`AMA -**Ask Me Anything**- is where you can ask me anything about my
- work,
- life,
- interests,
- anything.
`).content,
  },
  {
    question: 'How it works? 🤯',
    answer:
      matter(`You can ask me anything by typing in the text box below and hit the button.
AMA uses [LangChain](https://js.langchain.com/docs/get_started/introduction/) combined with [Vercel AI SDK](https://sdk.vercel.ai/docs) to generate the answer based on the data I provided.
Sometimes the answer might not be in the data I provided, so it will generate the answer based on the data from the internet.
`).content,
  },
  {
    question: 'What are the limitations? 🫣',
    answer: matter(`Well, there are some limitations:
- Currently, AMA only supports **English**.
- The rate limit is **2 requests per day per person**. Make sure you use it wisely 🤗
`).content,
  },
];
type InfoBoxProps = {
  children?: React.ReactNode;
};

const InfoBox: FC<InfoBoxProps> = (props) => {
  return (
    <div className="flex flex-col items-start border border-black/10 bg-white/10 rounded-md px-10 py-4">
      <div className="flex items-center mx-auto justify-center uppercase bg-slate-900 hover:bg-slate-800 transition-colors duration-300 text-xs text-white font-semibold px-3 py-1 rounded-3xl">
        Ask me anything
      </div>

      <div className="flex flex-col items-start space-y-3 mt-2">
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col items-start space-y-2">
            <div className="text-lg text-slate-900 font-semibold">
              {faq.question}
            </div>
            <ReactMarkdown
              className="text-sm prose prose-purple"
              remarkPlugins={[remarkGfm]}
            >
              {faq.answer}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBox;
