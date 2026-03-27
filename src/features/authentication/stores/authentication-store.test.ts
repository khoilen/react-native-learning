import {
  clearLocalUser,
  saveUserLocal,
} from '@/services/databases/repositories/user-repo';
import { User } from '@/types/user';
import { act, renderHook } from '@testing-library/react-native';
import { useAuthStore } from './authentication-store';

jest.mock('@/services/databases/repositories/user-repo', () => ({
  saveUserLocal: jest.fn(),
  clearLocalUser: jest.fn(),
}));

jest.mock('@/services/secure-storage', () => ({
  secureStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

const MOCK_USER: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  age: 30,
  role: 'user',
  username: 'johndoe',
};

const MOCK_TOKEN = 'mock-token-123';

const setup = () => renderHook(() => useAuthStore());

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    act(() => {
      useAuthStore.setState({ user: null, token: null, isLoading: true });
    });
  });

  it('initializes with default values', () => {
    const {
      result: {
        current: { user, token, isLoading },
      },
    } = setup();

    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isLoading).toBe(true);
  });

  it('updates user and calls saveUserLocal when setUser is called', async () => {
    const { result } = setup();

    await act(async () => {
      await result.current.setUser(MOCK_USER);
    });

    expect(saveUserLocal).toHaveBeenNthCalledWith(1, MOCK_USER);
    expect(result.current.user).toEqual(MOCK_USER);
    expect(result.current.isLoading).toBe(false);
  });

  it('updates token when setToken is called', async () => {
    const { result } = setup();

    await act(async () => {
      await result.current.setToken(MOCK_TOKEN);
    });

    expect(result.current.token).toEqual(MOCK_TOKEN);
  });

  it('clears state and calls clearLocalUser when logout is called', async () => {
    const { result } = setup();

    act(() => {
      useAuthStore.setState({ user: MOCK_USER, token: MOCK_TOKEN });
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(clearLocalUser).toHaveBeenCalledTimes(1);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('updates isLoading when setLoading is called', () => {
    const { result } = setup();

    act(() => result.current.setLoading(false));

    expect(result.current.isLoading).toBe(false);
  });
});
