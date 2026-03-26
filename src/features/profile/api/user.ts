import { User } from '@/types/user';
import { http } from '@/services/http';

export type UserResponse = {
  data: User;
  status: boolean;
};

export const updateUserRequest = async (
  dataUpdated: Pick<User, 'age' | 'firstName' | 'lastName'>,
) => {
  const { data } = await http.patch<UserResponse>(`/user`, {
    ...dataUpdated,
  });
  return data;
};
