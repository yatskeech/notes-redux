import { Note } from '../../types';
import { NotesAction, NOTES_ACTIONS } from './actions';

interface NotesStore {
  notes: Note[];
  loading: boolean;
}

const DEFAULT_STATE: NotesStore = {
  notes: [],
  loading: false,
};

export function notesReducer(state = DEFAULT_STATE, action: NotesAction) {
  switch (action.type) {
    case NOTES_ACTIONS.LOADING:
      return { ...state, loading: true };
    case NOTES_ACTIONS.NOT_LOADING:
      return { ...state, loading: false };
    case NOTES_ACTIONS.FETCH:
      return { ...state, notes: action.payload };
    case NOTES_ACTIONS.ADD:
      return { ...state, notes: [...state.notes, action.payload] };
    case NOTES_ACTIONS.SET:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id == action.payload.id ? action.payload : note
        ),
      };
    case NOTES_ACTIONS.DELETE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id != action.payload),
      };
    default:
      return state;
  }
}
