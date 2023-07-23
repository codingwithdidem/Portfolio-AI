import React, { FC } from 'react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { Clipboard, ClipboardCheck } from 'lucide-react';

type CopyToClipboardProps = {
  text: string;
};

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text }) => {
  const { copied, copyToClipboard } = useCopyToClipboard({
    text,
  });
  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-0 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in"
    >
      {copied ? (
        <ClipboardCheck className="w-4 h-4" />
      ) : (
        <Clipboard className="w-4 h-4" />
      )}
    </button>
  );
};

export default CopyToClipboard;
