import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import GlobalErrorBoundary from '../theme/GlobalErrorBoundary';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <GlobalErrorBoundary>
    <Header />
    <div className="content-layout">
      {children}
    </div>
    <ScrollRestoration />
  </GlobalErrorBoundary>;
}
