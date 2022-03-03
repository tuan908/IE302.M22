import { Navigate } from 'react-router-dom';
import { PinterestPrivateRouteProps } from '../routeConfigs';

interface Props extends PinterestPrivateRouteProps {}

const PinterestPrivateRoute = ({ outlet, authPath, isAuth }: Props) => {
  if (isAuth) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authPath }} />;
  }
};
export default PinterestPrivateRoute;
