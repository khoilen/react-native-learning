import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { useLoginMutation } from '../../hooks/use-login-mutation/use-login-mutation';
import { LoginForm } from './login-form';

jest.mock('lucide-react-native', () => ({ Fingerprint: () => null }));
jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));
jest.mock('@/features/authentication/stores/authentication-store', () => ({
  useAuthStore: jest.fn(),
}));
jest.mock('../../hooks/use-login-mutation/use-login-mutation', () => ({
  useLoginMutation: jest.fn(),
}));

const mockMutate = jest.fn();
const mockSetUser = jest.fn();
const mockSetToken = jest.fn();
let capturedOnSuccess: (data: unknown) => Promise<void>;
let capturedOnError: () => void;

const setup = () => {
  (useAuthStore as unknown as jest.Mock).mockReturnValue({
    setUser: mockSetUser,
    setToken: mockSetToken,
  });

  (useLoginMutation as jest.Mock).mockImplementation(mutationOptions => {
    capturedOnSuccess = mutationOptions.onSuccess;
    capturedOnError = mutationOptions.onError;

    return { mutate: mockMutate, isPending: false };
  });

  render(<LoginForm />);
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates store and shows toast on successful login', async () => {
    setup();

    const mockResponse = {
      data: {
        token: 'token-123',
        user: { firstName: 'John', lastName: 'Doe' },
      },
    };

    await capturedOnSuccess(mockResponse);

    expect(mockSetUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'success', text1: 'Login Success' }),
    );
  });

  it('shows error toast when login fails', () => {
    setup();

    capturedOnError();

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', text1: 'Login failed' }),
    );
  });

  it('submits form data to the mutation', async () => {
    setup();

    fireEvent.changeText(screen.getByPlaceholderText(/username/i), 'testuser');
    fireEvent.changeText(
      screen.getByPlaceholderText(/password/i),
      'password123',
    );
    fireEvent.press(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });
});
