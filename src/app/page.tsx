import Superpeer from './components/icons/Superpeer';
import classNames from 'classnames';

export default function Home() {
  return (
    <main className="py-24">
      <div className="z-10 mx-auto max-w-3xl flex flex-col w-full px-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Hello, I&apos;m Didem {''}
          <span className="animate-wiggle inline-block">👋</span>
        </h1>
        <p className="mt-5 text-lg">
          {`
             I'm a front-end developer, content creator, and a tech enthusiast. I love to share
             my knowledge and experience with others. I'm currently working at
          `}
          <a
            href="https://spiky.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            {' '}
            Spiky AI{' '}
          </a>
          <span className="bg-neutral-50/30">
            - A startup that helps sales teams to increase their sales by
            analyzing their conversations with their customers using{' '}
            <span className="font-semibold">AI</span> -
          </span>
        </p>
        {/* Socials */}
        <div className="flex items-center space-x-4 mt-10">
          <a
            href="https://superpeer.com/codingwithdidem/-/Help?s=d"
            className={classNames(
              'flex items-center space-x-2',
              'hover:opacity-80',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Superpeer className="w-6 h-6" />
            <span>Book 30 min with me</span>
          </a>
        </div>
      </div>
    </main>
  );
}
