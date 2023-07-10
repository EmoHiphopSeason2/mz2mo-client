import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

type UseToggleReturnType = [boolean, () => void, () => void, () => void, Dispatch<SetStateAction<boolean>>]

/**
 * @author RookieAND (백광인)
 * @description boolean 상태를 보다 편리하게 관리하기 위한 훅 useToggle
 * @param initValue 초기 state 상태
 * @return 현재 상태, 토글 함수, true 설정, false 설정, setState 함수 순으로 담긴 배열
 */
const useToggle = (initValue = false): UseToggleReturnType => {
  const [value, setValue] = useState(initValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse, setValue];
};

export default useToggle;