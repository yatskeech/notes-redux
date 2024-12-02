import { Button } from './ui';
import { PlusIcon } from './icons';
import { Profile } from './Profile';
import { ReactNode } from 'react';
import { Link } from 'react-router';
import clsx from 'clsx';

interface PanelProps {
  children?: ReactNode;
}

export function Panel({ children }: PanelProps) {
  return (
    <div className="h-screen w-96 flex flex-col bg-bg1 text-fg py-8 border-r border-fg4">
      <div className="px-8">
        <Link
          to="/"
          className={clsx(
            'w-full flex items-center gap-2 justify-center text-fg px-8 py-3 ',
            'rounded-md transition-colors border border-fg4 hover:bg-fg4/40'
          )}
        >
          <PlusIcon className="h-4 w-4" />
          Create a note
        </Link>
      </div>
      <div className="flex-grow flex flex-col my-4 overflow-y-scroll">
        {children}
      </div>
      <Profile />
    </div>
  );
}
