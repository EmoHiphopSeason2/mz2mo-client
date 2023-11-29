'use client';

import { useContext } from 'react';

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
        headerLeft={<h5 className="text-white text-h2">MZ2MO</h5>}
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
