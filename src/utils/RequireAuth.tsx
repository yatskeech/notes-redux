import { ReactNode, useContext } from 'react';
import { UserContext } from '../contexts';
import { Navigate } from 'react-router';
import { LoadingIcon } from '../components/icons';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const context = useContext(UserContext);

  if (context?.loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <LoadingIcon className="w-16 h-16" />
      </div>
    );
  }

  if (!context?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
