import { http } from '@/services/http';

export type LogoutResponse = {
  data: {
    message: string;
  };
  status: boolean;
};

export const logOut = async () => {
  const { data } = await http.post<LogoutResponse>('/logout');
  return data;
};
