'use client';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import Header from './Header';
import Footer from './Footer';
import { Analytics } from '@vercel/analytics/react';

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const pathname = usePathname();

  const displayFooter = pathname !== '/ask-me-anything';

  return (
    <div className="flex flex-col flex-1">
      <Toaster />
      <Header />

      <div className="background">
        <div className="gradient-blur" />
      </div>
      {children}

      {displayFooter && <Footer />}
      <Analytics />
    </div>
  );
};

export default Providers;
