import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginParams, loginRequest, LoginResponse } from '../../api/login';

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginParams>,
) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: loginRequest,
    ...options,
  });
