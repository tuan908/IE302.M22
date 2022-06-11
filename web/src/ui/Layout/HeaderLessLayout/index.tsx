import { PropsWithChildren, ReactNode } from 'react';
import { HeaderLessContainer } from './Component';

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default function HeaderLessLayout({ children }: Props): JSX.Element {
  return (
    <>
      <HeaderLessContainer>{children}</HeaderLessContainer>
    </>
  );
}
