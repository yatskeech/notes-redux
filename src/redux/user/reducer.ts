import { User } from '../../types';
import { USER_ACTIONS, UserAction } from './actions';

interface UserStore {
  user: User | null;
  loading: boolean;
}

const DEFAULT_STATE: UserStore = {
  user: null,
  loading: false,
};

export function userReducer(
  state: UserStore = DEFAULT_STATE,
  action: UserAction
): UserStore {
  switch (action.type) {
    case USER_ACTIONS.LOADING:
      return { ...state, loading: true };
    case USER_ACTIONS.NOT_LOADING:
      return { ...state, loading: false };
    case USER_ACTIONS.SET:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
