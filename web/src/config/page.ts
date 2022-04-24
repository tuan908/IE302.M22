import map from 'lodash/map';

export interface ScreenTypes {
  name?: string;
  path?: string;
  component?: string;
}

const MainRoutes: ScreenTypes[] = [
  {
    name: 'HOME',
    path: '/home',
    component: 'HomePage',
  },
  {
    name: 'PROFILE',
    path: '/profile',
    component: 'Profile',
  },
  {
    name: 'VERIFY',
    path: '/verify',
    component: 'Verify',
  },
  {
    name: 'PROFILE',
    path: '/profile',
    component: 'Profile',
  },
  {
    name: 'DETAIL',
    path: '/detail',
    component: 'Detail',
  },
];

const SideRoutes: ScreenTypes[] = [
  {
    name: 'Setting',
    path: '/setting',
    component: 'Setting',
  },
  {
    name: 'Help',
    path: '/help',
    component: 'Help',
  },
  {
    name: 'Sign out',
    path: '/signout',
    component: '',
  },
];

const screenWithPermission = [...MainRoutes];
const screenWithoutPermission: ScreenTypes[] = [];

const routesWithRoles = {
  screenListIfHaveAdminRole: map(MainRoutes, 'path'),
};

export {
  screenWithPermission,
  screenWithoutPermission,
  routesWithRoles,
  SideRoutes,
};
