import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { debounce } from '../utils/debounce';
import { Note } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addNoteAction } from '../redux/notes';

export function useCreateNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const userId = user!.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState(Date.now());

  const createNote = useCallback(
    debounce((note: Note) => {
      dispatch(addNoteAction(note));
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
