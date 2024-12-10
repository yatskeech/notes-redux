import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { LoadingIcon } from '../components/icons';
import { useAppSelector } from '../redux/store';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <LoadingIcon className="w-16 h-16" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
