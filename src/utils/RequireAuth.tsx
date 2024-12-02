import { ReactNode, useContext } from 'react';
import { UserContext } from '../contexts';
import { Navigate } from 'react-router';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const context = useContext(UserContext);

  if (context?.loading) {
    return <div>loading</div>;
  }

  if (!context?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
