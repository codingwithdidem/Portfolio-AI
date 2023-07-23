import { sharedMetadata } from '../../shared-metadata';
import Providers from './components/Providers';
import { raleway, rubik } from './styles/fonts/fonts';
import './styles/globals.css';

export const metadata = {
  ...sharedMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${raleway.className} flex min-h-screen flex-col flex-1`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
