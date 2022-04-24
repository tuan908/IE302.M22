import { Navigate } from 'react-router-dom';
import { RouteProps } from '../routeConfigs';

interface Props extends RouteProps {}

const PrivateRoute = ({ outlet, authPath, isAuth }: Props) => {
  if (isAuth) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authPath }} />;
  }
};
export default PrivateRoute;
