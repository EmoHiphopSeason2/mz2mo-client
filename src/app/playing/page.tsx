'use client';

import Header from '@/components/header/Header';
import MenuButton from '@/components/header/MenuButton';
import PreviousButton from '@/components/header/PreviousButton';

const PlayingPage = () => {
  return (
    <>
      <Header
        headerLeft={<PreviousButton onClick={() => {}} className="mb-auto" />}
        headerCenter={
          <div className="bg-black flex-col w-100 text-center">
            <h5 className="text-white text-h3">Hype Boy</h5>
            <p className="text-white text-body2">NewJeans</p>
          </div>
        }
        headerRight={<MenuButton onClick={() => {}} className="mb-auto" />}
      />
    </>
  );
};

export default PlayingPage;
