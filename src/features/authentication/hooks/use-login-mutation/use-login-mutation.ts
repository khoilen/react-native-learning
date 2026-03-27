import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginParams, loginRequest, LoginResponse } from '../../api/login';

export type UseLoginMutationOptions = UseMutationOptions<
  LoginResponse,
  AxiosError,
  LoginParams
>;

export const useLoginMutation = (options?: UseLoginMutationOptions) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (variables: LoginParams) => loginRequest(variables),
    ...options,
  });
