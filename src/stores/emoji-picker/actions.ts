import { atom } from 'jotai';

import emojiPickerAtom from '@/stores/emoji-picker/stores';

/**
 * emoji picker 모달 상태 (open or close)
 */
export const controlEmojiPickerIsOpenAtom = atom(
  (get) => get(emojiPickerAtom).isOpen,
  (get, set, isOpen: boolean) => {
    const prevAtom = get(emojiPickerAtom);
    set(emojiPickerAtom, { ...prevAtom, isOpen: isOpen });
  },
);

/**
 * 어떤 음악에 대한 emoji-picker 인지 설정
 */
export const controlEmojiPickerCurrentSongAtom = atom(
  (get) => get(emojiPickerAtom).currentSong,
  (get, set, updateSong: string) => {
    const prevAtom = get(emojiPickerAtom);
    set(emojiPickerAtom, { ...prevAtom, currentSong: updateSong });
  },
);
