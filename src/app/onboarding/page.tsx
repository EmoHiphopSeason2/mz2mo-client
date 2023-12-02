'use client';

import { useContext } from 'react';

import Mz2moIcon from '@/assets/icons/mz2moLogo.svg';
import Header from '@/components/header/Header';
import { PlaylistButton } from '@/components/playlist';
import { OnboardingContextValue } from '@/domains/onboarding/OnboardingContext';
import IntroSection from '@/domains/onboarding/intro-section';
import ProgressButton from '@/domains/onboarding/progress-button';
import SelectEmojiSection from '@/domains/onboarding/select-emoji';

const OnBoardingPage = () => {
  const { currentStage } = useContext(OnboardingContextValue);

  return (
    <>
      <Header
        headerLeft={<Mz2moIcon />}
        headerRight={<PlaylistButton className="mb-auto" />}
      />
      <section className="my-auto">
        {currentStage === 'WELCOME' ? <IntroSection /> : <SelectEmojiSection />}
      </section>
      <footer className="p-4">
        <ProgressButton />
      </footer>
    </>
  );
};

export default OnBoardingPage;
