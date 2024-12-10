import { Note, User } from '../../types';
import { deleteNote, findNotesBy, postNote, putNote } from '../../utils/api';
import { debounce } from '../../utils/debounce';
import { AppDispatch } from '../store';

export enum NOTES_ACTIONS {
  LOADING = 'NOTES/LOADING',
  NOT_LOADING = 'NOTES/NOT_LOADING',
  FETCH = 'NOTES/FETCH',
  ADD = 'NOTES/ADD',
  SET = 'NOTES/SET',
  DELETE = 'NOTES/DELETE',
}

export type NotesAction =
  | { type: NOTES_ACTIONS.FETCH; payload: Note[] }
  | { type: NOTES_ACTIONS.LOADING }
  | { type: NOTES_ACTIONS.NOT_LOADING }
  | { type: NOTES_ACTIONS.ADD; payload: Note }
  | { type: NOTES_ACTIONS.SET; payload: Note }
  | { type: NOTES_ACTIONS.DELETE; payload: Note['id'] };

export function fetchNotesAction(user: User) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: NOTES_ACTIONS.LOADING });

    findNotesBy({ userId: user.id })
      .then((notes) => dispatch({ type: NOTES_ACTIONS.FETCH, payload: notes }))
      .finally(() => dispatch({ type: NOTES_ACTIONS.NOT_LOADING }));
  };
}

export function addNoteAction(note: Note) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: NOTES_ACTIONS.ADD, payload: note });
    postNote(note);
  };
}

const debouncedPutNote = debounce(putNote);

export function setNoteAction(note: Note) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: NOTES_ACTIONS.SET, payload: note });
    debouncedPutNote(note);
  };
}

export function deleteNoteAction(note: Note) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: NOTES_ACTIONS.DELETE, payload: note.id });
    deleteNote(note);
  };
}
