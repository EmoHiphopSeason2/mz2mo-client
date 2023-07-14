'use client';

import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { createPortal } from 'react-dom';

type PortalProviderProps = PropsWithChildren & {
  portalName?: string | undefined;
};

const PortalContext = createContext<Map<string, HTMLDivElement | null>>(
  new Map([]),
);

const PortalProvider = ({
  children,
  portalName = 'app-portal',
}: PortalProviderProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const portalList = useContext(PortalContext);
  if (portalContainer) {
    portalList.set(portalName, portalContainer);
  }

  return (
    <PortalContext.Provider value={portalList}>
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

const PortalWrapper = ({
  children,
  portalName = 'app-portal',
}: PortalProviderProps) => {
  const portalList = useContext(PortalContext);
  const portalContainer = portalList.get(portalName);
  return portalContainer ? createPortal(children, portalContainer) : null;
};

const AppPortal = {
  Provider: PortalProvider,
  Wrapper: PortalWrapper,
};

export default AppPortal;
