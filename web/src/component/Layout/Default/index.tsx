import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Header from 'src/component/Header';
import { Container } from './DefaultLayoutComponents';

type Props = PropsWithChildren<{
  children?: ReactNode;
  token: string | undefined;
}>;

export default function DefaultLayout({ children }: Props) {
  const token = localStorage.getItem('token');
  return (
    <>
      {token ? (
        <>
          <Header />
          <Container>{children}</Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
