'use client';

import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import {
  controlCurrentDurationAtom,
  playerInstanceAtom,
} from '@/stores/youtube-controller';
import FormatUtil from '@/utils/format';

// NOTE : SVGCircleElement 의 원 둘레, Progress Bar 계산 시 사용되는 상수
const CIRCUMFERENCE = 1125;

const VinylRecordList = () => {
  const [currentDuration, setCurrentDuration] = useAtom(
    controlCurrentDurationAtom,
  );
  const playerInstance = useAtomValue(playerInstanceAtom);

  const circleProgressRef = useRef<SVGCircleElement | null>(null);
  const [circleDashOffset, setCircleDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (!playerInstance || !circleProgressRef.current) return;

    const maxDuration = playerInstance.getDuration();
    const currentProgress = Number(
      (1 - currentDuration / maxDuration).toFixed(3),
    );
    const dashOffset = Math.round(currentProgress * CIRCUMFERENCE);

    setCircleDashOffset(dashOffset);
  }, [playerInstance, currentDuration]);

  /**
   * NOTE : SVGElement 내에서 사용자가 클릭한 좌표계를 기준으로 백분율을 산출하여 duration을 수정하는 함수 handleChangeDuration
   *
   * 클릭된 지점과 원의 최상단 꼭짓점, 원의 중심을 이은 부채꼴이 이루는 각 (α) 의 크기를 구하는 로직
   * 세 점이 만든 삼각형은 이등변 삼각형이므로, 이를 가운데로 나누어 직각 삼각형을 만들고 절반의 각 (α / 2) 을 구한다.
   * 공식은 cos(90 - α) = √((x1 - x2) ^ 2 + (y1 - y2) ^ 2) / 2 / R 이고, 이를 정리하여 풀어내면 a = 2 * arcsin(D / 2 / R) 이다.
   *
   * 시작점의 좌표는 (360, 180) 이지만 그래프의 폭에 따라 X 좌표가 달라지기에 이에 대한 추가 연산이 필요하다.
   * 추가로 180도보다 큰 각인지, 작은 각인지 구하는 방법은 y 좌표가 180 미만인 경우 (원의 좌측) 이므로 추가 연산이 필요하다.
   */
  const handleChangeDuration = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!playerInstance || !circleProgressRef.current) return;

    const { offsetX: clickedX, offsetY: clickedY } = e.nativeEvent;
    if (clickedX === 360 && clickedY === 180) return 0;

    // NOTE : 그래프의 폭이 3px 이기 때문에, 내부에서 클릭한 위치가 원에서 얼마나 떨어져 있는지를 구하여 오차를 잡아야 함.
    const distanceFromCenter = Math.sqrt(
      (clickedX - 180) ** 2 + (clickedY - 180) ** 2,
    );

    const distance = Math.sqrt(
      (clickedX - (distanceFromCenter + 180)) ** 2 + (clickedY - 180) ** 2,
    );

    // NOTE : arcsin 의 반환값은 radian 이기 때문에, 각도 표기법으로 반환하기 위해 (180 / π) 를 곱해줘야 한다.
    let theta =
      2 *
      (Math.asin(Math.min(distance / 2 / distanceFromCenter, 1)) *
        (180 / Math.PI));

    // NOTE : offsetY 좌표가 180 미만인 경우 중심각이 180도 이상이라는 의미이므로 추가 연산을 진행한다.
    theta = clickedY <= 180 ? 360 - theta : theta;

    const maxDuration = playerInstance.getDuration();
    const changedDuration = Number(((theta / 360) * maxDuration).toFixed(3));
    setCurrentDuration(changedDuration);
    playerInstance.seekTo(changedDuration, true);
  };

  return (
    <>
      <p className="text-center text-white w-100 text-caption">
        {FormatUtil.formatTimeToMMSS(currentDuration)}
      </p>
      <div className="flex items-center justify-center gap-x-5">
        <div className="min-w-[360px] min-h-[360px] flex flex-col items-center">
          <VinylRecord />
        </div>
        <div className="relative min-w-[360px] min-h-[360px]">
          <svg
            onClick={handleChangeDuration}
            className="absolute z-10 -rotate-90"
            width="360"
            height="360"
            viewBox="0 0 360 360"
            fill="transparent"
          >
            <defs>
              <linearGradient id="mz02" gradientTransform="rotate(135)">
                <stop offset="0%" stopColor="#1853FF" />
                <stop offset="100%" stopColor="#18FF59" />
              </linearGradient>
            </defs>
            <circle
              ref={circleProgressRef}
              className="mr-auto"
              stroke="url(#mz02)"
              cx="180"
              cy="180"
              r="178"
              strokeWidth="4"
              strokeDasharray={1125}
              strokeDashoffset={circleDashOffset}
            />
          </svg>
          <div className="w-[360px] h-[360px] absolute rounded-full bg-white/30 flex flex-col justify-content items-center">
            <div className="w-[354px] h-[354px] rounded-full bg-black flex flex-col justify-center m-auto items-center z-[11]">
              <VinylRecord />
            </div>
          </div>
        </div>
        <div className="min-w-[360px] min-h-[360px] flex flex-col items-center">
          <VinylRecord />
        </div>
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
  return (
    <div
      style={{ backgroundImage: `url(${albumCoverUrl})` }}
      className="w-[340px] h-[340px] rounded-full flex flex-col justify-center m-auto items-center"
    >
      <div className="w-[100px] h-[100px] rounded-full bg-black m-auto flex flex-col justify-center items-center">
        <p className="text-[54px]">{emoji}</p>
      </div>
    </div>
  );
};

export default VinylRecordList;
