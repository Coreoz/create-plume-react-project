import Header from '@components/layout/header/Header';
import { ReactNode } from 'react';
import scss from './layout.module.scss';

type Props = {
  children: ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className={scss.contentLayout}>
        {children}
      </div>
    </>
  );
}
