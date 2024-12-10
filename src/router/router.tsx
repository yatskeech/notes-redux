import { createBrowserRouter, Navigate } from 'react-router';
import { AuthLayout, Layout, PanelLayout } from '../layouts';
import {
  CreateNotePage,
  LoginPage,
  NotePage,
  ProfilePage,
  RegisterPage,
} from '../pages';
import { loginAction, registerAction } from '../utils/actions';
import { RequireAuth } from '../utils/RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: (
          <RequireAuth>
            <PanelLayout />
          </RequireAuth>
        ),
        children: [
          {
            index: true,
            element: <CreateNotePage />,
          },
          {
            path: ':id',
            element: <NotePage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '*',
            element: <Navigate to="/" />,
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
    ],
  },
]);
