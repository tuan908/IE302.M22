import { Route, Routes } from 'react-router-dom';
import PinterestNotFound from './pages/404';
import Login from './pages/Login';
import { privatePages } from './util/page';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {privatePages.map((page, index) => (
        <Route
          path={page.path}
          element={<page.layout token={token!}>{page.element}</page.layout>}
          key={index}
        />
      ))}

      <Route path="*" element={<PinterestNotFound />} />
    </Routes>
  );
}

export default App;
