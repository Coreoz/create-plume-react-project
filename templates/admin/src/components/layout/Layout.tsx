import Header from '@components/layout/header/Header';
import Navigation from '@components/navigation/Navigation';
import GlobalErrorBoundary from '@components/theme/GlobalErrorBoundary';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import scss from './layout.module.scss';

type Props = {
  children: React.ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <GlobalErrorBoundary>
      <div id={scss.mainLayout}>
        <Navigation />
        <div id={scss.contentLayout}>
          <Header id={scss.mainHeader} />
          <div id={scss.mainContent}>
            {children}
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </GlobalErrorBoundary>
  );
}
