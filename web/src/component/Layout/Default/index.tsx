import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Header from 'src/component/Header';
import { DefaultLayoutContainer } from './DefaultLayoutComponents';

export default function DefaultLayout({
  children,
}: PropsWithChildren<{ children?: ReactNode; token: string | undefined }>) {
  const token = localStorage.getItem('token');

  return (
    <>
      {token ? (
        <>
          <Header />
          <DefaultLayoutContainer>{children}</DefaultLayoutContainer>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
