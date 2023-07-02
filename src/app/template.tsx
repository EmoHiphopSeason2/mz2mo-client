'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const YoutubePlayerController = dynamic(
  () => import('@/components/youtube-player'),
  {
    ssr: false,
  },
);

export default function Template({ children }: { children: React.ReactNode }) {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => setIsRendered(true), []);
  return (
    <div>
      {isRendered ? <YoutubePlayerController /> : null}
      {children}
    </div>
  );
}
