import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logOut, LogoutResponse } from '../../api/logout';

export const useLogoutMutation = (
  options?: UseMutationOptions<LogoutResponse, AxiosError, void>,
) =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: logOut,
    ...options,
  });
