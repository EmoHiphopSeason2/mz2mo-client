import { Metadata, ResolvingMetadata } from 'next';
import { Inter } from 'next/font/google';

import { metadata } from '@/constants/siteMetaData';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
