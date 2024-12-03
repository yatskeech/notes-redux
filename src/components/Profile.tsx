import { Avatar } from './ui';
import { NavLink, useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../contexts';
import { User } from '../types';
import clsx from 'clsx';

export function Profile() {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const user = context?.user as User;

  const logOut = () => {
    context?.setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        clsx(
          'flex gap-2 items-center px-8 py-4 transition-colors hover:bg-bg2',
          {
            'bg-bg2 ': isActive,
          }
        )
      }
    >
      <Avatar user={user} variant={'small'} />
      <div className="flex flex-col">
        <h3 className="text-fg text-sm font-bold">{user.username}</h3>
        <h4 className="text-fg4 text-xs">{user.email}</h4>
      </div>
      <button
        onClick={logOut}
        className="ml-auto px-4 py-1 border border-red rounded-full text-red text-xs hover:bg-red hover:text-fg transition-colors"
      >
        Log out
      </button>
    </NavLink>
  );
}
