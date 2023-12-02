import { useCallback, useRef } from 'react';

/**
 * 일정 주기를 기준으로 인자로 받은 함수가 한 번만 호출되도록 throttle 처리된 함수를 반환하는 useThrottle
 * @returns throttle 처리할 함수와 주기를 인자로 받는 callback 함수
 */
export const useThrottle = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const throttle = useCallback(
    // NOTE : callback 함수 인자의 타입을 추론하기 위해 Generic 사용
    <T extends (...args: any[]) => void>(callback: T, delay: number) =>
      (...args: Parameters<T>) => {
        if (timer.current) return;
        timer.current = setTimeout(() => {
          callback(...args);
          timer.current = null;
        }, delay);
      },
    [],
  );

  return { throttle }
};
