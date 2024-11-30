import { User } from '../types';
import { data } from 'react-router';
import { RegisterActionData } from './actions';

const URL_API = 'http://localhost:3000';

type UserParams = { [key in keyof User]?: string };

export async function findUsersBy(userParams: UserParams): Promise<User[]> {
  const params = new URLSearchParams(userParams);
  const response = await fetch(`${URL_API}/users?${params}`);

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function register(user: User) {
  if ((await findUsersBy({ username: user.username })).length) {
    throw data<RegisterActionData>(
      {
        inputErrors: {
          username: 'This name is already taken by another user',
        },
      },
      { status: 400 }
    );
  }

  if ((await findUsersBy({ email: user.email })).length) {
    throw data<RegisterActionData>(
      {
        inputErrors: {
          email: 'This email is already taken by another user',
        },
      },
      { status: 400 }
    );
  }

  const response = await fetch(`${URL_API}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw data<RegisterActionData>(
      { totalError: 'Failed to connect to server' },
      { status: 400 }
    );
  }
}
