import { createContext, useContext, useRef } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

import { createPortal } from 'react-dom';

const PortalContext = createContext<HTMLDivElement | undefined>(undefined);

interface PortalProviderProps {
  children: ReactNode;
  portalName: string | undefined;
}

const PortalProvider = ({
  children,
  portalName = 'app-portal',
}: PortalProviderProps) => {
  const portalRef = useRef<HTMLDivElement>();
  <PortalContext.Provider value={portalRef.current}>
    <div
      id={portalName}
      ref={(element) => {
        if (element) portalRef.current = element;
      }}
    >
      {children}
    </div>
  </PortalContext.Provider>;
};

const PortalWrapper = ({ children }: PropsWithChildren) => {
  const portalRef = useContext(PortalContext);
  return portalRef ? createPortal(children, portalRef) : null;
};

export { PortalProvider, PortalWrapper };
