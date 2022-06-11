import { Navigate, Route, Routes } from 'react-router-dom';
import PinterestNotFound from './page/404';
import Login from './page/Login';
import { privatePages } from './util/page';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
  );
}

export default App;
