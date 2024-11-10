import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='w-10/12 mx-auto h-[92vh] py-10 overflow-hidden'>
      {children}
    </div>
  );
};

export default MainLayout;
