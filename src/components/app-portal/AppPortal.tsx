import { createContext, useContext, useRef } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface PortalProviderProps {
  children: ReactNode;
  portalName: string | undefined;
}

const PortalContext = createContext<HTMLDivElement | null>(null);

const PortalProvider = ({
  children,
  portalName = 'app-portal',
}: PortalProviderProps) => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  <PortalContext.Provider value={portalRef.current}>
    <div
      id={portalName}
      ref={(element) => {
        if (element && !portalRef.current) portalRef.current = element; // NOTE : PortalRef가 미설정되었으며 DOM 요소가 잡힐 경우 등록
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

const AppPortal = {
    Provider: PortalProvider,
    Wrapper: PortalWrapper,
}

export default AppPortal;
