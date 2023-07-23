import { useState } from 'react';
import { toast } from 'sonner';

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
    } catch (err) {
      toast.error('Failed to copy to clipboard');
      console.error(err);
    }
  };

  return { copyToClipboard, copied };
}
