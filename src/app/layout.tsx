import { Metadata, ResolvingMetadata } from 'next';

import { pretendard } from '@/app/fonts';
import { metadata } from '@/constants/siteMetaData';
import JotaiAtomProvider from '@/utils/JotaiAtomProvider';
import ReactQueryProvider from '@/utils/ReactQueryProvider';

import './globals.css';

export async function generateMetadata(
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  return {
    ...metadata,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="relative m-auto min-h-screen min-w-[360px] max-w-[480px] bg-gray-500">
        <ReactQueryProvider>
          <JotaiAtomProvider>{children}</JotaiAtomProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
