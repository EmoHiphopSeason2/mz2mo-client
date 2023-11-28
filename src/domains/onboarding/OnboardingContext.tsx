import { createContext, useMemo, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

type OnboardingStageType = 'WELCOME' | 'SELECT_EMOJI';

interface OnboardingValueType {
    currentStage: OnboardingStageType;
    selectedEmojis: string[];
    currentPage: number;
}

interface OnboardingActionType {
    setCurrentStage: Dispatch<SetStateAction<OnboardingStageType>>;
    setSelectedEmojis:  Dispatch<SetStateAction<string[]>>;
    setCurrentPage:  Dispatch<SetStateAction<number>>;
}

export const OnboardingContextValue = createContext<OnboardingValueType>({} as OnboardingValueType);
export const OnboardingContextAction = createContext<OnboardingActionType>({} as OnboardingActionType);


const OnboardingContextProvider = ({ children }: PropsWithChildren) => {
  const [currentStage, setCurrentStage] =
    useState<OnboardingStageType>('WELCOME');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const value = useMemo(() => ({
    currentStage,
    selectedEmojis,
    currentPage
  }), [    currentStage,
    selectedEmojis,
    currentPage])

  const action = useMemo(() => ({
    setCurrentStage,
    setSelectedEmojis,
    setCurrentPage,
  }), [])

  return <OnboardingContextValue.Provider value={value}>
    <OnboardingContextAction.Provider value={action}>
        {children}
    </OnboardingContextAction.Provider>
  </OnboardingContextValue.Provider>
};

export default OnboardingContextProvider;
