'use client';

import LongButton from '@/components/button/LongButton';
import Header from '@/components/header/Header';
import { Playlist, PlaylistButton, usePlaylist } from '@/components/playlist';

const OnBoardingPage = () => {
  const { isOpenPlaylist } = usePlaylist();

  return (
    <>
      <Header
        headerLeft={<h5 className="text-white text-h2">MZ2MO</h5>}
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <div className="flex flex-col py-2 my-auto"></div>
      <div className="p-4">
        <LongButton hasArrow >
          <p className="text-subtitle1">체험해보기</p>
        </LongButton>
      </div>
      {isOpenPlaylist ? <Playlist /> : null}
    </>
  );
};

export default OnBoardingPage;
