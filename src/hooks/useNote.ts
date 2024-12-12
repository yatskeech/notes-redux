import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteNoteAction, setNoteAction } from '../redux/notes';

export function useNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { notes, loading } = useAppSelector((state) => state.notes);
  const note = notes.find((n) => n.id == id);

  if (!note) {
    return { loading };
  }

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setNoteAction({
        ...note,
        title: event.target.value,
        createdAt: Date.now(),
      })
    );
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setNoteAction({
        ...note,
        content: event.target.value,
        createdAt: Date.now(),
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteNoteAction(note));
    navigate('/', { replace: true });
  };

  return { note, loading, handleTitle, handleContent, handleDelete };
}
