import { Avatar } from '../components/ui';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setUserAction } from '../redux/user';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const logout = () => {
    dispatch(setUserAction(null));
    navigate('/login', { replace: true });
  };

  return (
    <div className="p-8 flex-grow flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Avatar user={user!} variant={'large'} />
        <div className="flex flex-col items-center">
          <h2 className="text-fg text-4xl font-bold">{user!.username}</h2>
          <span className="text-fg4 text-sm">{user!.email}</span>
          <button
            onClick={logout}
            className="mt-4 px-8 py-1 border border-red rounded-full text-red text-xs hover:bg-red hover:text-fg transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
