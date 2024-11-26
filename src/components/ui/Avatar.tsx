import clsx from 'clsx';
import { User } from '../../types';

interface AvatarProps {
  user: User;
  variant: 'small' | 'large';
}

export function Avatar({ user, variant }: AvatarProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center leading-normal',
        'text-fg font-bold rounded-full bg-bg4',
        {
          ['text-sm w-8 h-8']: variant === 'small',
          ['text-6xl w-40 h-40']: variant === 'large',
        }
      )}
    >
      {user.username[0].toUpperCase()}
    </div>
  );
}
