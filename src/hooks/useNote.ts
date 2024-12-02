import { ChangeEvent, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NotesContext } from '../contexts';

export function useNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const notesContext = useContext(NotesContext);
  const note = notesContext?.notes.find((n) => n.id == id);

  if (!note) {
    navigate('/', { replace: true });
    return { note: null, handleTitle: null, handleContent: null };
  }

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    notesContext?.setNote({
      ...note,
      title: event.target.value,
      createdAt: Date.now(),
    });
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    notesContext?.setNote({
      ...note,
      content: event.target.value,
      createdAt: Date.now(),
    });
  };

  return { note, handleTitle, handleContent };
}
