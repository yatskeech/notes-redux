import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Note } from '../types';
import { UserContext } from './user';
import { findNotesBy, postNote, putNote } from '../utils/api';
import { debounce } from '../utils/debounce';

interface NotesContextData {
  notes: Note[];
  loading: boolean;
  addNote: (note: Note) => void;
  setNote: (note: Note) => void;
}

export const NotesContext = createContext<NotesContextData | null>(null);

export function NotesContextProvider({ children }: { children: ReactNode }) {
  const context = useContext(UserContext);

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = context!.user;

    findNotesBy({ userId: user!.id })
      .then(setNotes)
      .finally(() => setLoading(false));
  }, []);

  const debouncedPutNote = useCallback(debounce(putNote), []);

  const addNote = (note: Note) => {
    setNotes((notes) => [note, ...notes]);
    postNote(note);
  };

  const setNote = (note: Note) => {
    setNotes((notes) => notes.map((n) => (n.id == note.id ? note : n)));
    debouncedPutNote(note);
  };

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, setNote }}>
      {children}
    </NotesContext.Provider>
  );
}
