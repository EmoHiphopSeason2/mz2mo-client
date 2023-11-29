'use client';

import { createContext, useMemo, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

type OnboardingStageType = 'WELCOME' | 'SELECT_EMOJI';

interface OnboardingValueType {
  currentStage: OnboardingStageType;
  selectedEmojis: string[];
}

interface OnboardingActionType {
  setCurrentStage: Dispatch<SetStateAction<OnboardingStageType>>;
  setSelectedEmojis: Dispatch<SetStateAction<string[]>>;
}

export const OnboardingContextValue = createContext<OnboardingValueType>(
  {} as OnboardingValueType,
);
export const OnboardingContextAction = createContext<OnboardingActionType>(
  {} as OnboardingActionType,
);

const OnboardingContextProvider = ({ children }: PropsWithChildren) => {
  const [currentStage, setCurrentStage] =
    useState<OnboardingStageType>('WELCOME');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      currentStage,
      selectedEmojis,
    }),
    [currentStage, selectedEmojis],
  );

  const action = useMemo(
    () => ({
      setCurrentStage,
      setSelectedEmojis,
    }),
    [],
  );

  return (
    <OnboardingContextValue.Provider value={value}>
      <OnboardingContextAction.Provider value={action}>
        {children}
      </OnboardingContextAction.Provider>
    </OnboardingContextValue.Provider>
  );
};

export default OnboardingContextProvider;
