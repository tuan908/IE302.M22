import { Route, Routes } from 'react-router-dom';
import './App.css';
import { privatePages } from './common/page';
import DefaultLayout from './component/Layout/Default';
import PinterestNotFound from './pages/404';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {privatePages.map(({ element, path }, index) => (
        <Route
          path={path}
          element={<DefaultLayout>{element}</DefaultLayout>}
          key={index}
        />
      ))}

      <Route path="*" element={<PinterestNotFound />} />
    </Routes>
  );
};

export default App;
