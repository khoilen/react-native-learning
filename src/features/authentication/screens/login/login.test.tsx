import { render, screen } from '@testing-library/react-native';
import { useLoginMutation } from '../../hooks/use-login-mutation/use-login-mutation';
import { useAuthStore } from '../../stores/authentication-store';
import { Login } from './login';

const mockMutate = jest.fn();
const mockSetUser = jest.fn();
const mockSetToken = jest.fn();

jest.mock('@/features/authentication/stores/authentication-store', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../../hooks/use-login-mutation/use-login-mutation', () => ({
  useLoginMutation: jest.fn(),
}));

const setup = () => {
  (useAuthStore as unknown as jest.Mock).mockReturnValue({
    setUser: mockSetUser,
    setToken: mockSetToken,
  });

  (useLoginMutation as jest.Mock).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
  });

  return render(<Login />);
};

describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    setup();
    expect(screen.getByText('Welcome Back')).toBeTruthy();
  });
});
