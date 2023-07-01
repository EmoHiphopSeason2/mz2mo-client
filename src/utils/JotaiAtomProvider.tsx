'use client';

import { PropsWithChildren } from 'react';

import { Provider } from 'jotai';

const JotaiAtomProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default JotaiAtomProvider;
