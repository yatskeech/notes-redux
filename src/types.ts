export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: number;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: number;
}
