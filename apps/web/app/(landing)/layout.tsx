import LandingLayout from '@/components/landing-layout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
