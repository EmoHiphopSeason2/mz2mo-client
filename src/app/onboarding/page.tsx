'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import LongButton from '@/components/button/LongButton';
import Header from '@/components/header/Header';
import { PlaylistButton } from '@/components/playlist';
import IntroSection from '@/domains/onboarding/intro-section';
import SelectEmojiSection from '@/domains/onboarding/select-emoji';

const ONBOARDING_CONTENTS = {
  WELCOME: {
    content: <IntroSection />,
    bottom: (
      <LongButton hasArrow>
        <p className="text-subtitle1">체험해보기</p>
      </LongButton>
    ),
  },
  SELETE_EMOJI: {
    content: <SelectEmojiSection />,
    bottom: (
      <LongButton hasArrow>
        <p className="text-subtitle1">체험해보기</p>
      </LongButton>
    ),
  },
} as const;

type OnboardingStageType = keyof typeof ONBOARDING_CONTENTS;

const OnBoardingPage = () => {
  const router = useRouter();
  const [currentStage, setCurrentStage] =
    useState<OnboardingStageType>('WELCOME');

  const handleBottomButton = () => {
    currentStage === 'WELCOME'
      ? setCurrentStage('SELETE_EMOJI')
      : router.replace('/');
  };

  return (
    <>
      <Header
        headerLeft={<h5 className="text-white text-h2">MZ2MO</h5>}
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <section className="my-auto">
        {ONBOARDING_CONTENTS[currentStage].content}
      </section>
      <footer className="p-4">
        <LongButton hasArrow onClick={handleBottomButton}>
          <p className="text-subtitle1">체험해보기</p>
        </LongButton>
      </footer>
    </>
  );
};

export default OnBoardingPage;
