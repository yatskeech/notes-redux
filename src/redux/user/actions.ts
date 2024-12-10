import { User } from '../../types';
import { getUserById } from '../../utils/api';
import { AppDispatch } from '../store';

export enum USER_ACTIONS {
  LOADING = 'USER/LOADING',
  NOT_LOADING = 'USER/NOT_LOADING',
  SET = 'USER/SET',
}

export type UserAction =
  | { type: USER_ACTIONS.LOADING }
  | { type: USER_ACTIONS.NOT_LOADING }
  | { type: USER_ACTIONS.SET; payload: User | null };

export function fetchUserAction(userId: string) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: USER_ACTIONS.LOADING });

    getUserById(userId)
      .then((user) => dispatch({ type: USER_ACTIONS.SET, payload: user }))
      .catch(() => dispatch({ type: USER_ACTIONS.SET, payload: null }))
      .finally(() => dispatch({ type: USER_ACTIONS.NOT_LOADING }));
  };
}

export function setUserAction(user: User | null) {
  return { type: USER_ACTIONS.SET, payload: user };
}
