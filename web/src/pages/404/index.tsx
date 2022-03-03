import { Link } from 'react-router-dom';

const PinterestNotFound = () => {
  <div className="err-template">
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
  </div>;
};

export default PinterestNotFound;
