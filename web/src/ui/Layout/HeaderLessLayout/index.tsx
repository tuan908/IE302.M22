import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { HeaderLessContainer } from './Component';

type Props = PropsWithChildren<{
  children?: ReactNode;
  token: string | undefined;
}>;

export default function HeaderLessLayout({
  children,
  token,
}: Props): JSX.Element {
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
