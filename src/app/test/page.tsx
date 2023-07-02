'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const YoutubePlayerController = dynamic(
  () => import('@/components/youtube-player'),
  {
    ssr: false,
  },
);

export default function TestPage() {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => setIsRendered(true), []);

  return isRendered ? <YoutubePlayerController /> : null;
}
