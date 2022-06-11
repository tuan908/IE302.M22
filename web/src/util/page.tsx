import Detail from 'src/page/Detail';
import Home from 'src/page/Home';
import Profile from 'src/page/Profile';
import Search from 'src/page/Search';
import DefaultLayout from 'src/ui/Layout/Default';
import HeaderLessLayout from 'src/ui/Layout/HeaderLessLayout';

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
    path: '/search',
    element: <Search />,
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
