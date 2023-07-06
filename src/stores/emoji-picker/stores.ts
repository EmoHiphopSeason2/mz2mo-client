import { atom } from 'jotai';

import { EmojiPickerControllerType } from '@/types/atom';

const emojiPickerAtom = atom<EmojiPickerControllerType>({
  currentSong: '',
  isOpen: false,
});

export default emojiPickerAtom;
