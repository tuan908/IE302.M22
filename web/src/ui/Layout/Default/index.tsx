import { PropsWithChildren, ReactNode } from 'react';
import Header from 'src/ui/Header';
import { Container } from './Component';

type Props = PropsWithChildren<{
  children?: ReactNode;
}>;

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
