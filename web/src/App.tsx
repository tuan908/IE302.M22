import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import PinterestErrorBoundary from './component/ErrorBoundary';
import DefaultLayout from './component/Layout/DefaultLayout';
import { privateRoutes, publicRoutes } from './route';
import UserUtils from './util/user';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getUserInfo } = UserUtils;
  const userInfo = getUserInfo();
  const redirect = useNavigate();

  useEffect(() => {
    if (isEmpty(userInfo)) {
      setIsLoggedIn(false);
      redirect('/login');
    } else {
      setIsLoggedIn(true);
      redirect('/');
    }
  }, []);

  return (
    <PinterestErrorBoundary>
      <Routes>
        {isLoggedIn
          ? privateRoutes.map(({ layout, element, path }, index) => {
              const Layout = layout || DefaultLayout;
              const Page = element;
              return (
                <Route
                  key={index}
                  path={path}
                  element={<Layout>{Page}</Layout>}
                />
              );
            })
          : publicRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
      </Routes>
    </PinterestErrorBoundary>
  );
};

export default App;
