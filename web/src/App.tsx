import { CircularProgress } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from 'src/page/Admin';
import { usePinterestSelector } from './redux/hooks';

import privatePages from './util/page';

function App() {
  const user = usePinterestSelector((state) => state.userReducer.user);
  const Login = lazy(() => import('./page/Login'));
  const PinterestNotFound = lazy(() => import('./page/Login'));
  const Register = lazy(() => import('./page/Register'));
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo && userInfo !== 'undefined' && user !== {}) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/admin" element={<Admin />} />

        {privatePages.map((page, index) => (
          <Route
            path={page.path}
            element={<page.layout>{page.element}</page.layout>}
            key={index}
          />
        ))}

        <Route path="*" element={<PinterestNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
