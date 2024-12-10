import { applyMiddleware, combineReducers, createStore } from 'redux';
import { NotesAction, notesReducer } from './notes';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserAction, userReducer } from './user';

const rootReducer = combineReducers({
  notes: notesReducer,
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppAction = NotesAction | UserAction;
