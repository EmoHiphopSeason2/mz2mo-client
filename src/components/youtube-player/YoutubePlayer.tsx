'use client';

import { useEffect, useRef, useState } from 'react';

import YouTubePlayer from 'react-player/youtube';

const YoutubePlayer = () => {
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);

  return <YouTubePlayer style={{ display: 'none' }} ref={youtubePlayerRef} />;
};

export default YoutubePlayer;
