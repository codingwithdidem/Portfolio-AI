import { useState } from 'react';
import { toast } from 'sonner';
import va from '@vercel/analytics';

type Props = {
  text: string;
  timeout?: number;
};

export default function useCopyToClipboard({ text, timeout = 2000 }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      toast.success('Copied to clipboard');
      va.track('copied-to-clipboard', { text });
    } catch (err) {
      toast.error('Failed to copy to clipboard');
      console.error(err);
    }
  };

  return { copyToClipboard, copied };
}
