import { Navigate } from 'react-router-dom';
import { IServerResponse } from 'src/common/serverResponse';
import Header from 'src/component/Header';
import { usePinterestSelector } from 'src/redux/hooks';

type IProps = {
  children?: JSX.Element;
};

export default function DefaultLayout({ children }: IProps) {
  const userState: IServerResponse = usePinterestSelector(
    (userState) => userState.userReducer.user
  );
  const { token } = userState;

  return (
    <>
      {token ? (
        <>
          <Header />
          <div className="container">{children}</div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
