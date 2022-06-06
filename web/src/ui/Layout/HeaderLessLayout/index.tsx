import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { HeaderLessContainer } from './Component';

type Props = PropsWithChildren<{
  children?: ReactNode;
}>;

export default function HeaderLessLayout({ children }: Props): JSX.Element {
  const token = localStorage.getItem('token');
  return (
    <>
      {token ? (
        <>
          <HeaderLessContainer>{children!}</HeaderLessContainer>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
