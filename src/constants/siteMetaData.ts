import { Metadata } from 'next';

const APP_NAME = 'mz2mo';
const APP_DESCRIPTION = '음악을 듣고 어울리는 이모지를 투표해보세요🎵';

export const metadata: Metadata = {
  title: APP_NAME,
  applicationName: APP_DESCRIPTION,
  manifest: '/manifest.json',
  keywords: ['emoji', 'music', 'youtube', 'voting'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  openGraph: {
    type: 'website',
    url: '',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: '',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@creator',
    images: 'https://example.com/og.png',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
  ],
};
