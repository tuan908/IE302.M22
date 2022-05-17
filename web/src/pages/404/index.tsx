import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundWrapper } from './Components';

const PinterestNotFound = () => {
  return (
    <Fragment>
      <NotFoundWrapper>
        <h1>404 Not Found</h1>
        <h3 className="err-dtl">Requested page not found!!!</h3>
        <div className="err-act">
          <Link className="btn btn-primary btn-lg" to="/">
            Take me home
          </Link>
          <Link className="btn btn-info btn-lg" to="/">
            Contact support
          </Link>
        </div>
      </NotFoundWrapper>
    </Fragment>
  );
};

export default PinterestNotFound;
