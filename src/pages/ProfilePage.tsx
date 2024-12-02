import { useContext } from 'react';
import { Avatar } from '../components/ui';
import { UserContext } from '../contexts';
import { User } from '../types';
import { useNavigate } from 'react-router';

export function ProfilePage() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const user = userContext?.user as User;

  const logout = () => {
    userContext?.setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <div className="p-8 flex-grow">
      <div className="flex flex-col items-center gap-4 mt-40">
        <Avatar user={user} variant={'large'} />
        <div className="flex flex-col items-center">
          <h2 className="text-fg text-4xl font-bold">{user.username}</h2>
          <span className="text-fg4 text-sm">{user.email}</span>
          <button
            onClick={logout}
            className="mt-4 px-8 py-1 border border-red rounded-full text-red text-xs hover:bg-red/40 hover:text-fg transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
