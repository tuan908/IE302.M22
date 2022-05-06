import { ElementType } from 'react';
import type { RouteObject } from 'react-router-dom';
import PinterestPost from 'src/component/Post';
import PinterestHome from 'src/pages/Home';
import Login from 'src/pages/Login';
import PinterestProfile from 'src/pages/Profile';

interface PinterestRouteObject extends RouteObject {
  layout?: ElementType;
}

const publicRoutes: PinterestRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const privateRoutes: PinterestRouteObject[] = [
  {
    path: '/',
    element: <PinterestHome />,
  },
  {
    path: '/user/:id',
    element: <PinterestProfile />,
  },
  {
    path: '/post/:id',
    element: <PinterestPost />,
  },
];

export { privateRoutes, publicRoutes };
