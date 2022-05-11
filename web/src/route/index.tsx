import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  isAllowed: Boolean;
  children?: any;
  redirectPath?: string;
}

const ProtectedRoute: FC<IProps> = ({
  isAllowed,
  children,
  redirectPath = '/login',
}) => {
  console.log(children);
  console.log(isAllowed);
  if (!isAllowed) {
    <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
