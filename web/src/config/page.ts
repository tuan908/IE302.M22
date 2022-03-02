import map from 'lodash/map';

export interface PinterestScreenTypes {
  name?: string;
  path?: string;
  component?: string;
}

const PinterestScreenList: PinterestScreenTypes[] = [
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

const PinterestMenuScreen: PinterestScreenTypes[] = [
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

const screenWithPermission = [...PinterestScreenList];
const screenWithoutPermission: PinterestScreenTypes[] = [];

const routesWithRoles = {
  screenListIfHaveAdminRole: map(PinterestScreenList, 'path'),
};

export {
  screenWithPermission,
  screenWithoutPermission,
  routesWithRoles,
  PinterestMenuScreen,
};
