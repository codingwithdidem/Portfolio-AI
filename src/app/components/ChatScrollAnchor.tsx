'use client';

import { useInView } from 'framer-motion';
import React, { FC, useRef } from 'react';
import { useAtBottom } from '../hooks/useAtBottom';

type ChatScrollAnchorProps = {
  track: boolean;
};

const ChatScrollAnchor: FC<ChatScrollAnchorProps> = ({ track }) => {
  const ref = useRef(null);
  const isAtBottom = useAtBottom();

  const isInView = useInView(ref, {
    margin: '0px 0px -150px 0px',
  });

  React.useEffect(() => {
    if (isAtBottom && !isInView && track) {
      console.log('in view');
      if (ref && ref.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [isInView, track, isAtBottom]);

  return <div ref={ref} className="h-4 w-full" />;
};

export default ChatScrollAnchor;
