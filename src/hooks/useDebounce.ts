import { useCallback, useRef } from 'react';

/**
 * 일정 주기 동안 같은 함수가 Trigger 되지 않도록 debounce 처리된 함수를 반환하는 useDebounce
 * @returns debounce 처리할 함수와 주기를 인자로 받는 callback 함수
 */
export const useDebounce = (
) => {
  const timer = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    <T extends (...args: any[]) => void>(callback: T, delay: number) =>
      (...args: Parameters<T>) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => callback(...args), delay);
      },
    [],
  );

  return { debounce };
};
