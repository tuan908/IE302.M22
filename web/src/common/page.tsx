import DefaultLayout from 'src/component/Layout/Default';
import HeaderLessLayout from 'src/component/Layout/HeaderLessLayout';
import Detail from 'src/pages/Detail';
import Home from 'src/pages/Home';
import Profile from 'src/pages/Profile';
import Search from 'src/pages/Search';
import ModifyProfile from 'src/component/ModifyProfile';

const privatePages = [
  {
    path: '/home',
    element: <Home />,
    layout: DefaultLayout,
  },
  {
    path: '/user/:id',
    element: <Profile />,
    layout: HeaderLessLayout,
  },
  {
    path: '/image/:id',
    element: <Detail />,
    layout: DefaultLayout,
  },
  {
    path: '/',
    element: <Home />,
    layout: DefaultLayout,
  },
  {
    path: '/search',
    element: <Search />,
    layout: DefaultLayout,
  },
  {
    path: '/modify-profile',
    element: <ModifyProfile/>,
    layout: DefaultLayout,
  },
];

const sidePages = [
  {
    pageName: 'Help',
    path: '/help',
  },
  {
    pageName: 'Sign out',
  },
];
export { privatePages, sidePages };
