import { Outlet } from 'react-router-dom';
import Header from 'src/component/Header';

type IProps = {
  children?: JSX.Element;
  isLoggedIn: Boolean;
};

export default function DefaultLayout({ children, isLoggedIn }: IProps) {
  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <div className="container">{children}</div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
