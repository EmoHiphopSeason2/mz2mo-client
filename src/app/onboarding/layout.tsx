import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-col w-full h-screen overflow-hidden bg-black drop-shadow-md">
      {children}
    </main>
  );
};

export default Layout;
