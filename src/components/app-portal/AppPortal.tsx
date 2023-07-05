'use client'

import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface PortalProviderProps {
  children: ReactNode;
  portalName?: string | undefined;
}

const PortalContext = createContext<HTMLDivElement | null>(null);

const PortalProvider = ({
  children,
  portalName = 'app-portal',
}: PortalProviderProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <PortalContext.Provider value={portalContainer}>
      <div
        id={portalName}
        ref={(element) => {
          if (element && !portalContainer) setPortalContainer(element);
        }}
      />
      {children}
    </PortalContext.Provider>
  );
};

const PortalWrapper = ({ children }: PropsWithChildren) => {
  const portalContainer = useContext(PortalContext);
  return portalContainer ? createPortal(children, portalContainer) : null;
};

const AppPortal = {
  Provider: PortalProvider,
  Wrapper: PortalWrapper,
};

export default AppPortal;
