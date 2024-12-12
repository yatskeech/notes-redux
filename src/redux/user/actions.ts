import { User } from '../../types';
import { getUserById } from '../../utils/api';
import { AppDispatch } from '../store';

export enum USER_ACTIONS {
  NOT_LOADING = 'USER/NOT_LOADING',
  SET = 'USER/SET',
}

const KEY_USER_ID = 'userId';

export type UserAction =
  | { type: USER_ACTIONS.NOT_LOADING }
  | { type: USER_ACTIONS.SET; payload: User | null };

export function fetchUserAction() {
  return (dispatch: AppDispatch) => {
    const userId = localStorage.getItem(KEY_USER_ID);

    if (!userId) {
      dispatch({ type: USER_ACTIONS.NOT_LOADING });
      return;
    }

    getUserById(userId)
      .then((user) => dispatch({ type: USER_ACTIONS.SET, payload: user }))
      .catch(() => dispatch({ type: USER_ACTIONS.SET, payload: null }))
      .finally(() => dispatch({ type: USER_ACTIONS.NOT_LOADING }));
  };
}

export function setUserAction(user: User | null) {
  if (user) {
    localStorage.setItem(KEY_USER_ID, user.id);
  } else {
    localStorage.removeItem(KEY_USER_ID);
  }

  return { type: USER_ACTIONS.SET, payload: user };
}
