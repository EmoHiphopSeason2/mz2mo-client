import { useSetAtom } from 'jotai';

import { useToastAtom } from '@/stores/toast';

export const useToast = () => {
  const addToast = useSetAtom(useToastAtom);
  return {
    toast: {
      success: addToast('success'),
      info: addToast('info'),
      error: addToast('error'),
    },
  };
};
