import { createBrowserRouter } from 'react-router';
import { AuthLayout, Layout, PanelLayout } from '../layouts';
import { LoginPage, ProfilePage, RegisterPage } from '../pages';
import { loginAction, registerAction } from '../utils/actions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PanelLayout />,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            action: loginAction,
            element: <LoginPage />,
          },
          {
            path: 'register',
            action: registerAction,
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: '*',
        element: null,
      },
    ],
  },
]);
