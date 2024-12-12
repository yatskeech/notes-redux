import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { LoadingIcon } from '../components/icons';
import { userConnector } from '../redux/user';
import { ConnectedProps } from 'react-redux';

interface RequireAuthProps extends ConnectedProps<typeof userConnector> {
  children: ReactNode;
}

function RequireAuthComponent({
  children,
  user,
  loading,
  fetchUserAction,
}: RequireAuthProps) {
  useEffect(() => {
    fetchUserAction();
  }, []);

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

export const RequireAuth = userConnector(RequireAuthComponent);
