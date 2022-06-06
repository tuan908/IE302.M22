import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Header from 'src/ui/Header';
import { Container } from './Component';

type Props = PropsWithChildren<{
  children?: ReactNode;
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
