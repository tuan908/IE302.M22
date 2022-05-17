import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { HeaderLessContainer } from './HeaderLessLayout';

export default function HeaderLessLayout({
  children,
  token,
}: PropsWithChildren<{
  children?: ReactNode;
  token: string | undefined;
}>): JSX.Element {
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
