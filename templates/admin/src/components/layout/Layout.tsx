import Header from '@components/layout/header/Header';
import Navigation from '@components/navigation/Navigation';
import { ReactNode } from 'react';
import SecurityBanner from '@components/features/security/SecurityBanner';
import scss from './layout.module.scss';

type Props = {
  children: ReactNode,
};

export default function Layout({ children }: Readonly<Props>) {
  return (
    <>
      <SecurityBanner />
      <div id={scss.mainLayout}>
        <Navigation />
        <div id={scss.contentLayout}>
          <Header id={scss.mainHeader} />
          <div id={scss.mainContent}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
