import { http } from '@/services/http';
import { User } from '@/types/user';

export type LoginResponse = {
  data: {
    token: string;
    user: User;
  };
  status: boolean;
};

export type LoginParams = {
  password: string;
  username: string;
};

export const loginRequest = async (credentials: LoginParams) => {
  const { data } = await http.post<LoginResponse>('/login', credentials);
  return data;
};
