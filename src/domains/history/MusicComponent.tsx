import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import clsx from 'clsx';

interface MusicComponentProps {
  item: {
    id: string;
    url: string;
    title: string;
    artist: string;
    emoji?: string;
  };
  isLastItem: boolean;
  className: string;
}

const MusicComponent = ({
  item,
  isLastItem,
  className,
}: MusicComponentProps) => {
  return (
    <li
      className={clsx(
        'flex gap-3 items-center',
        isLastItem ? 'pr-4' : '',
        className,
      )}
      key={item.id}
    >
      <Image
        className={clsx('rounded-[4px] w-[80px] h-[80px]')}
        src={item.url}
        alt={item.title}
        width="80"
        height="80"
      />
      <div className="flex flex-col w-full overflow-hidden whitespace-nowrap">
        <div className="overflow-hidden text-ellipsis">
          {`${item.emoji} ` ?? ''}
          {item.title}
        </div>
        <span className="text-caption font-regular">{item.artist}</span>
        <Link
          href="/"
          className="px-3 mt-2.5 py-1 font-normal text-gray-300 border border-gray-300 rounded-full w-fit text-caption"
        >
          {item.emoji ? '재투표' : '투표하기'}
        </Link>
      </div>
    </li>
  );
};

export default MusicComponent;
