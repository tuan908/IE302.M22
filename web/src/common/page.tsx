import Detail from 'src/pages/Detail';
import Home from 'src/pages/Home';
import { Signout } from 'src/pages/Logout';
import Profile from 'src/pages/Profile';

export interface ScreenTypes {
  pageName?: string;
  path?: string;
  element?: JSX.Element;
}

const privatePages: ScreenTypes[] = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
];

const sidePages: ScreenTypes[] = [
  {
    pageName: 'Help',
    path: '/help',
  },
  {
    pageName: 'Sign out',
    path: '/sign-out',
    element: <Signout />,
  },
];

export { privatePages, sidePages };
