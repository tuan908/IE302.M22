import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import privatePages from './util/page';

function App() {
  const Login = lazy(() => import('./page/Login'));
  const PinterestNotFound = lazy(() => import('./page/Login'));
  const Register = lazy(() => import('./page/Register'));

  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/home" replace />} />

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
