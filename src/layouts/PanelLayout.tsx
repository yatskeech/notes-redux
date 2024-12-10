import { Outlet } from 'react-router';
import { NoteItem, Panel } from '../components';
import { InfoIcon, LoadingIcon } from '../components/icons';
import { Note } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { fetchNotesAction } from '../redux/notes';

export function PanelLayout() {
  const dispatch = useAppDispatch();

  const { notes, loading } = useAppSelector((state) => state.notes);
  const sort = (a: Note, b: Note) => b.createdAt - a.createdAt;

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => dispatch(fetchNotesAction(user!)), []);

  if (loading) {
    return (
      <div className="flex-grow flex">
        <Panel>
          <LoadingIcon className="my-auto self-center w-16 h-16" />
        </Panel>
        <Outlet />
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="flex-grow flex">
        <Panel>
          <div className="flex-grow flex items-center justify-center text-fg4 gap-2">
            <InfoIcon className="w-8 h-8" />
            You don't have any notes
          </div>
        </Panel>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex-grow flex">
      <Panel>
        {notes.sort(sort).map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </Panel>
      <Outlet />
    </div>
  );
}
