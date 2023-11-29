'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import LongButton from '@/components/button/LongButton';
import {
  OnboardingContextAction,
  OnboardingContextValue,
} from '@/domains/onboarding/OnboardingContext';

const ProgressButton = () => {
  const { currentStage, selectedEmojis } = useContext(OnboardingContextValue);
  const { setCurrentStage } = useContext(OnboardingContextAction);
  const router = useRouter();

  const isEmojiSelected = selectedEmojis.length === 3;

  if (currentStage === 'WELCOME') {
    return (
      <LongButton hasArrow onClick={() => setCurrentStage('SELECT_EMOJI')}>
        <p className="text-subtitle1">체험해보기</p>
      </LongButton>
    );
  }

  return (
    <LongButton
      hasArrow={isEmojiSelected}
      disabled={!isEmojiSelected}
      onClick={() => router.replace('/')}
    >
      <p className="text-subtitle1">
        {isEmojiSelected ? '이렇게 할래요' : '이모지를 선택해주세요'}
      </p>
    </LongButton>
  );
};

export default ProgressButton;
