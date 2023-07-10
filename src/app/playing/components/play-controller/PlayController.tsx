'use client';

import ControlNextIcon from '@/assets/icons/controlNext.svg';
import ControlPauseIcon from '@/assets/icons/controlPause.svg';
import ControlPrevIcon from '@/assets/icons/controlPrev.svg';
import DisableLoopIcon from '@/assets/icons/disableLoop.svg';
import VolumeIcon from '@/assets/icons/volume.svg';

const PlayController = () => {
  return (
    <div className="max-w-[296px] flex gap-[52px] mx-auto my-[21px]">
      <DisableLoopIcon className="my-auto" />
      <div className="flex gap-[23px] items-center">
        <ControlPrevIcon
          width={24}
          height={24}
          className="text-white my-auto"
        />
        <ControlPauseIcon width={50} height={50} className="text-white" />
        <ControlNextIcon
          width={24}
          height={24}
          className="text-white my-auto"
        />
      </div>
      <VolumeIcon className="my-auto" />
    </div>
  );
};

export default PlayController;
