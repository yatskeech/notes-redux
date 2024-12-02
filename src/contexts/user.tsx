import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../types';
import { getUserById } from '../utils/api';

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const USER_ID_KEY = 'userId';

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_KEY);

    if (!userId) {
      setLoading(false);
      return;
    }

    getUserById(userId)
      .then((user) => {
        if (!user) {
          localStorage.removeItem(USER_ID_KEY);
          return;
        }

        setUser(user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      localStorage.removeItem(USER_ID_KEY);
      return;
    }

    localStorage.setItem(USER_ID_KEY, user.id);
  }, [user, loading]);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
