import youtubeControllerAtom from '@/stores/youtube-controller/stores';
import {
  UpdateCurrentPlayingType,
  UpdatePlayingStateType,
  UpdatePlaylistActionType,
  UpdateVolumeActionType,
} from '@/types/atom/youtubeController';
import { atom } from 'jotai';

/**
 * 현재 재생하려는 playlist index를 제어하는 derivedAtom (controlCurrentPlayingAtom)
 */
export const controlCurrentPlayingAtom = atom(
  (get) => get(youtubeControllerAtom).currentPlayingIndex,
  (get, set, update: UpdateCurrentPlayingType) => {
    const prevAtom = get(youtubeControllerAtom);
    const prevSongList = prevAtom.playList;

    if (update.index < 0) update.index = 0;
    if (update.index >= prevSongList.length)
      update.index = prevSongList.length - 1;

    set(youtubeControllerAtom, {
      ...prevAtom,
      currentPlayingIndex: update.index,
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
  (get, set, update: UpdateVolumeActionType) => {
    const prevAtom = get(youtubeControllerAtom);
    if (update.volume < 0) update.volume = 0;
    if (update.volume > 1) update.volume = 1;

    set(youtubeControllerAtom, { ...prevAtom, volume: update.volume });
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
    switch (update.action) {
      case 'start':
        set(youtubeControllerAtom, { ...prevAtom, isPlaying: true });
        break;
      case 'stop':
        set(youtubeControllerAtom, { ...prevAtom, isPlaying: false });
        break;
      case 'toggle':
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
