'use client';

import clsx from 'clsx';
import { useAtomValue } from 'jotai';

import { controlCurrentDurationAtom } from '@/stores/youtube-controller';
import FormatUtil from '@/utils/format';

import * as styles from './VinylRecord.module.scss';

const VinylRecordList = () => {
  const currentDuration = useAtomValue(controlCurrentDurationAtom);

  return (
    <>
      <p className="text-center w-100 text-white text-caption mt-[9px]">
        {FormatUtil.formatTimeToMMSS(currentDuration)}
      </p>
      <div className="w-[1060px] -translate-x-[290px] flex gap-x-5 justify-center m-auto items-center">
        <VinylRecord />
        <div className="min-w-[360px] h-[360px] rounded-full bg-white/30 flex flex-col justify-center m-auto items-center">
          <div className="min-w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#1853FF] to-[#18FF59] flex flex-col justify-center m-auto items-center">
            <div className="w-[357px] h-[357px] rounded-full bg-black flex flex-col justify-center m-auto items-center">
              <VinylRecord />
            </div>
          </div>
        </div>
        <VinylRecord />
      </div>
    </>
  );
};

// FIXME : 백엔드 API가 생성된 이후에는 수정해야 할 Props Default Value
interface VinylRecordProps {
  albumCoverUrl?: string;
  emoji?: string;
}

const VinylRecord = ({
  albumCoverUrl = 'https://image.bugsm.co.kr/album/images/500/40780/4078016.jpg',
  emoji = '🐰',
}: VinylRecordProps) => {
  // NOTE : 앨범 커버 이미지 Url을 CSS 변수로 선언하고, SCSS 모듈에서 사용하기 위한 코드
  const albumCoverStyle = {
    '--album-cover': `url(${albumCoverUrl})`,
  } as React.CSSProperties;

  return (
    <div
      style={albumCoverStyle}
      className={clsx(
        styles.albumCover,
        'w-[340px] h-[340px] rounded-full flex flex-col justify-center m-auto items-center',
      )}
    >
      <div className="w-[100px] h-[100px] rounded-full bg-black m-auto flex flex-col justify-center items-center">
        <p className="text-[54px]">{emoji}</p>
      </div>
    </div>
  );
};

export default VinylRecordList;
