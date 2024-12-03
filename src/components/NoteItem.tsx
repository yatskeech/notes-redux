import { NavLink } from 'react-router';
import { Note } from '../types';
import clsx from 'clsx';

interface NoteItemProps {
  note: Note;
}

export function NoteItem({ note }: NoteItemProps) {
  const slice = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <NavLink
      to={note.id}
      className={({ isActive }) =>
        clsx('px-8 py-3 transition-colors hover:bg-bg2', {
          'bg-bg2 ': isActive,
        })
      }
    >
      <h2 className="text-md font-bold leading-normal">
        {slice(note.title, 25) || 'Title'}
      </h2>
      <p className="text-sm text-fg4 leading-tight">
        {slice(note.content, 30) || 'No addition text'}
      </p>
      <span className="text-xs text-fg2">
        {new Date(note.createdAt).toLocaleString()}
      </span>
    </NavLink>
  );
}
