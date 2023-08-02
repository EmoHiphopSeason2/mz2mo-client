import Image from 'next/image';
import React from 'react';

import {
  Reorder,
  animate,
  useDragControls,
  useMotionValue,
} from 'framer-motion';

import CloseIcon from '@/assets/icons/close.svg';
import MenuIcon from '@/assets/icons/menu.svg';

// FIXME: 추후 playlist type 변경
interface PlaylistItemProps {
  item: {
    id: number;
    url: string;
    title: string;
    artist: string;
  };
}

const PlaylistItem = ({ item }: PlaylistItemProps) => {
  const controls = useDragControls();
  const y = useMotionValue(0);

  const onDragEnd = () => {
    animate(y, 0); // 드래그가 끝날 때 원래 위치로 돌아가게 하기 위함
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    controls.start(e);
  };

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      onDragEnd={onDragEnd}
      style={{ y }}
      className="flex items-center gap-[24px] px-5 py-3 hover:bg-gray-900"
    >
      <Image
        className="rounded-full"
        src={item.url}
        alt={item.title}
        width="50"
        height="50"
      />
      <div className="flex flex-col flex-1 mr-auto overflow-hidden whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis text-subtitle1">
          {item.title}
        </span>
        <span className="overflow-hidden text-ellipsis text-body3">
          {item.artist}
        </span>
      </div>
      <div className="flex gap-2">
        <CloseIcon className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white" />
        <MenuIcon
          className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
          onPointerDown={onPointerDown}
        />
      </div>
    </Reorder.Item>
  );
};

export default PlaylistItem;
