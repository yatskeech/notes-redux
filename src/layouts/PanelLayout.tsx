import { Outlet } from 'react-router';
import { NoteItem, Panel } from '../components';
import { InfoIcon, LoadingIcon } from '../components/icons';
import { useContext } from 'react';
import { NotesContext } from '../contexts/notes';
import { Note } from '../types';

export function PanelLayout() {
  const context = useContext(NotesContext);

  const notes = context!.notes;
  const loading = context!.loading;

  const sort = (a: Note, b: Note) => b.createdAt - a.createdAt;

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
