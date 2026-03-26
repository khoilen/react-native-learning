import { User } from '@/types/user';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateUserRequest, UserResponse } from '../../api/user';

type UpdateUserParams = Pick<User, 'age' | 'firstName' | 'lastName'>;

export const useUpdateUserMutation = (
  options?: UseMutationOptions<UserResponse, AxiosError, UpdateUserParams>,
) =>
  useMutation({
    mutationKey: ['update-user'],
    mutationFn: (data: UpdateUserParams) => updateUserRequest(data),
    ...options,
  });
