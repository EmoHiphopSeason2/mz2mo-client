import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full min-w-[360px] max-w-[480px] h-screen flex flex-col bg-black drop-shadow-md m-auto overflow-hidden">
      {children}
    </main>
  );
};

export default Layout;
