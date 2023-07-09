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
      <body className="bg-gray-500">
        <ReactQueryProvider>
          <JotaiAtomProvider>
            <main className="w-[375px] flex-col bg-white drop-shadow-md m-auto">
              {children}
            </main>
          </JotaiAtomProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
