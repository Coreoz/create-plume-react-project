import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import GlobalErrorBoundary from '@components/theme/GlobalErrorBoundary';
import scss from './layout.module.scss';


type Props = {
  children: React.ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <GlobalErrorBoundary>
      <Header />
      <div className={scss.contentLayout}>
        {children}
      </div>
      <ScrollRestoration />
    </GlobalErrorBoundary>
  );
}
