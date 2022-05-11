import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { privatePages } from './common/page';
import PinterestNotFound from './pages/404';
import Login from './pages/Login';
import { usePinterestSelector } from './redux/hooks';
import ProtectedRoute from './route';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const userState = usePinterestSelector((userState) => userState);
  React.useEffect(() => {
    console.log(userState);
    if (userState) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [userState]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            {privatePages.map(({ element, path }, index) => (
              <Route path={path} element={element} key={index} />
            ))}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PinterestNotFound />} />
    </Routes>
  );
};

export default App;
