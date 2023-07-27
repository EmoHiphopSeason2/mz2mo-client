import React from 'react';

import PlaylistMenu from '@/assets/icons/playlistMenu.svg';
import { usePlaylist } from '@/components/playlist/hooks';

interface PlaylistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: React.ComponentProps<'button'>['className'];
  iconSize?: number;
}

const PlaylistButton = ({
  className,
  iconSize = 28,
  ...props
}: PlaylistButtonProps) => {
  const { openPlaylist } = usePlaylist();
  return (
    <button onClick={openPlaylist} className={className} {...props}>
      <PlaylistMenu width={iconSize} height={iconSize} className="text-white" />
    </button>
  );
};

export default PlaylistButton;
