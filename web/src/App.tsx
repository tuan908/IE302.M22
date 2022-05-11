import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { privatePages } from './common/page';
import { IServerResponse } from './common/serverResponse';
import DefaultLayout from './component/Layout/Default';
import PinterestNotFound from './pages/404';
import Login from './pages/Login';
import { usePinterestSelector } from './redux/hooks';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const userState: IServerResponse = usePinterestSelector(
    (userState) => userState.userReducer.user
  );
  const { token } = userState;
  console.log(userState);
  React.useEffect(() => {
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [token]);
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {privatePages.map(({ element, path }, index) => (
        <Route
          path={path}
          element={
            <DefaultLayout isLoggedIn={isLoggedIn}>{element}</DefaultLayout>
          }
          key={index}
        />
      ))}

      <Route path="*" element={<PinterestNotFound />} />
    </Routes>
  );
};

export default App;
