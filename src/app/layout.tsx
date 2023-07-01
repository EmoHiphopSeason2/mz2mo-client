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
      <body>
        <ReactQueryProvider>
          <JotaiAtomProvider>{children}</JotaiAtomProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
