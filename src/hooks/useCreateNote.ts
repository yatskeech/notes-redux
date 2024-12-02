import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { NotesContext, UserContext } from '../contexts';
import { debounce } from '../utils/debounce';
import { Note } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function useCreateNote() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const notesContext = useContext(NotesContext);

  const userId = userContext?.user?.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState(Date.now());

  const createNote = useCallback(
    debounce((note: Note) => {
      notesContext?.addNote(note);
      navigate(`/${note.id}`, { replace: true });
    }, 1000),
    []
  );

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const createdAt = Date.now();

    setTitle(title);
    setCreatedAt(createdAt);

    createNote({ id: uuidv4(), userId, title, content, createdAt });
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    const createdAt = Date.now();

    setContent(content);
    setCreatedAt(createdAt);

    createNote({ id: uuidv4(), userId, title, content, createdAt });
  };

  return { title, handleTitle, createdAt, content, handleContent };
}
