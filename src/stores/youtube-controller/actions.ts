import { atom } from 'jotai';

import youtubeControllerAtom from '@/stores/youtube-controller/stores';
import {
  UpdatePlayerInstanceType,
  UpdatePlayingStateType,
  UpdatePlaylistActionType,
  UpdateLoopStateType,
} from '@/types/atom/youtubeController';

/**
 * 새로운 Youtube Iframe 전용 인스턴스를 인계 받는 derivedAtom (playerInstanceAtom)
 * YT.Player 클래스 인스턴스를 저장하며, 추후 외부에서 플레이어 관련 로직을 사용할 때 필요.
 */
export const playerInstanceAtom = atom(
  (get) => get(youtubeControllerAtom).playerInstance,
  (get, set, update: UpdatePlayerInstanceType) => {
    const prevAtom = get(youtubeControllerAtom);
    set(youtubeControllerAtom, { ...prevAtom, playerInstance: update.ref });
  },
);

/**
 * 현재 플레이어의 재생 시간을 제어하는 derivedAtom (controlCurrentDurationAtom)
 */
export const controlCurrentDurationAtom = atom(
  (get) => get(youtubeControllerAtom).currentDuration,
  (get, set, updatedDuration: number) => {
    const prevAtom = get(youtubeControllerAtom);

    if (!prevAtom.playerInstance) return prevAtom;
    const maxDuration = prevAtom.playerInstance.getDuration();

    if (updatedDuration < 0) updatedDuration = 0;
    if (updatedDuration >= maxDuration) updatedDuration = maxDuration;

    set(youtubeControllerAtom, {
      ...prevAtom,
      currentDuration: updatedDuration,
    });
  },
);

/**
 * 현재 재생하려는 playlist index를 제어하는 derivedAtom (controlCurrentPlayingAtom)
 */
export const controlCurrentPlayingAtom = atom(
  (get) => get(youtubeControllerAtom).currentPlayingIndex,
  (get, set, updatedIndex: number) => {
    const prevAtom = get(youtubeControllerAtom);
    const prevSongAmount = prevAtom.playList.length;

    if (updatedIndex < 0) updatedIndex = 0;
    if (updatedIndex >= prevSongAmount) updatedIndex = prevSongAmount - 1;

    // NOTE : 다음 곡으로 이동했으므로, 재생 시간 (currentDuration) 도 0초로 초기화
    set(youtubeControllerAtom, {
      ...prevAtom,
      currentPlayingIndex: updatedIndex,
      currentDuration: 0,
    });
  },
);

/**
 * 현재 플레이에어 등록된 음악 VID 목록을 업데이트 하는 derivedAtom (controlPlaylistAtom)
 * 추가, 삭제, 초기화, 삽입, 교체 다섯 가지의 기능을 제공하도록 setAtom 로직 구현
 */
export const controlPlaylistAtom = atom(
  (get) => get(youtubeControllerAtom).playList,
  (get, set, update: UpdatePlaylistActionType) => {
    const prevAtom = get(youtubeControllerAtom);
    const prevSongList = prevAtom.playList;

    switch (update.action) {
      case 'add': {
        set(youtubeControllerAtom, {
          ...prevAtom,
          playList: [...prevSongList, update.songVid],
        });
        break;
      }
      case 'remove': {
        set(youtubeControllerAtom, {
          ...prevAtom,
          playList: prevSongList.filter((vid) => vid !== update.songVid),
        });
        break;
      }
      case 'reset': {
        set(youtubeControllerAtom, { ...prevAtom, playList: [] });
        break;
      }
      case 'insert': {
        // TODO : 잘못된 범주의 index를 입력 받았을 경우 에러를 throw 할지, 적절한 값으로 변경시킬지 논의 필요
        if (update.index < 0) update.index = 0;
        if (update.index >= prevSongList.length)
          update.index = prevSongList.length - 1;

        set(youtubeControllerAtom, {
          ...prevAtom,
          playList: prevSongList.splice(update.index, 0, update.songVid),
        });
        break;
      }
      case 'change': {
        // TODO : 잘못된 범주의 index를 입력 받았을 경우 에러를 throw 할지, 적절한 값으로 변경시킬지 논의 필요
        if (update.index < 0) update.index = 0;
        if (update.index >= prevSongList.length)
          update.index = prevSongList.length - 1;

        set(youtubeControllerAtom, {
          ...prevAtom,
          playList: prevSongList.splice(update.index, 1, update.songVid),
        });
        break;
      }
      default: {
        set(youtubeControllerAtom, prevAtom);
      }
    }
  },
);

/**
 * 현재 플레이어의 Volume 수준을 조정하는 derivedAtom (controlVolumeAtom)
 * 0부터 1 사이의 소수를 넣어 수준을 조정할 수 있으며, 범주 밖으로 벗어날 경우 0 또는 1로 조정
 */
export const controlVolumeAtom = atom(
  (get) => get(youtubeControllerAtom).volume,
  (get, set, updatedVolume: number) => {
    const prevAtom = get(youtubeControllerAtom);
    if (updatedVolume < 0) updatedVolume = 0;
    if (updatedVolume > 1) updatedVolume = 1;

    set(youtubeControllerAtom, {
      ...prevAtom,
      volume: updatedVolume,
    });
  },
);

/**
 * 현재 플레이어의 재생 상태를 조정하는 derivedAtom (controlPlayingStateAtom)
 * 재생, 정지, 전환 세 가지 케이스로 나누어 각각의 타입을 적용할 수 있음.
 */
export const controlPlayingStateAtom = atom(
  (get) => get(youtubeControllerAtom).isPlaying,
  (get, set, update: UpdatePlayingStateType) => {
    const prevAtom = get(youtubeControllerAtom);
    const playListSongAmount = prevAtom.playList.length;

    switch (update.action) {
      case 'start':
        if (!playListSongAmount) return;
        set(youtubeControllerAtom, { ...prevAtom, isPlaying: true });
        break;
      case 'stop':
        set(youtubeControllerAtom, { ...prevAtom, isPlaying: false });
        break;
      case 'toggle':
        if (!prevAtom.isPlaying && !playListSongAmount) return;
        set(youtubeControllerAtom, {
          ...prevAtom,
          isPlaying: !prevAtom.isPlaying,
        });
        break;
      default:
        set(youtubeControllerAtom, prevAtom);
    }
  },
);


/**
 * 현재 플레이어의 반복 재생 여부를 조정하는 derivedAtom (controlLoopStateAtom)
 * 재생, 정지, 전환 세 가지 케이스로 나누어 각각의 타입을 적용할 수 있음.
 */
export const controlLoopStateAtom = atom(
  (get) => get(youtubeControllerAtom).loopState,
  (get, set, update: UpdateLoopStateType) => {
    const prevAtom = get(youtubeControllerAtom);
      set(youtubeControllerAtom, { ...prevAtom, loopState: update.action });
    }
);
