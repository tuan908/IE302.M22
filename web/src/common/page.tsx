import DefaultLayout from 'src/component/Layout/Default';
import HeaderLessLayout from 'src/component/Layout/HeaderLessLayout';
import Detail from 'src/pages/Detail';
import Home from 'src/pages/Home';
import { Signout } from 'src/pages/Logout';
import Profile from 'src/pages/Profile';

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
];

const sidePages = [
  {
    pageName: 'Help',
    path: '/help',
  },
  {
    pageName: 'Sign out',
    path: '/sign-out',
    element: Signout,
  },
];
export { privatePages, sidePages };
