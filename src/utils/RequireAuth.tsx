import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { LoadingIcon } from '../components/icons';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUserAction } from '../redux/user';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAction());
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
