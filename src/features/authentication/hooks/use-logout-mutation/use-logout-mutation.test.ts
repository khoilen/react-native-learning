import { createWrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react-native';
import { logOut } from '../../api/logout';
import { useLogoutMutation } from './use-logout-mutation';

jest.mock('../../api/logout', () => ({
  logOut: jest.fn(),
}));

const mockOnSuccess = jest.fn();

const MOCK_LOGOUT_RESPONSE = {
  success: true,
  message: 'Logged out successfully',
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
  onSuccess?: () => void;
};

const defaultOptions: SetupOptions = {
  mockError: undefined,
  mockResponse: MOCK_LOGOUT_RESPONSE,
  onSuccess: mockOnSuccess,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { mockError, mockResponse, onSuccess } = {
    ...defaultOptions,
    ...options,
  };

  if (mockError) {
    (logOut as jest.Mock).mockRejectedValue(mockError);
  } else {
    (logOut as jest.Mock).mockResolvedValue(mockResponse);
  }

  return renderHook(() => useLogoutMutation({ onSuccess }), {
    wrapper: createWrapper(),
  });
};

describe('useLogoutMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls logOut when mutate is triggered', async () => {
    const { result } = setup();

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(logOut).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(MOCK_LOGOUT_RESPONSE);
  });

  it('returns an error when logOut fails', async () => {
    const mockError = new Error('Logout failed');
    const { result } = setup({
      mockError,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  it('triggers options callbacks like onSuccess', async () => {
    const { result } = setup();

    result.current.mutate();

    await waitFor(() =>
      expect(mockOnSuccess).toHaveBeenNthCalledWith(
        1,
        MOCK_LOGOUT_RESPONSE,
        undefined,
        undefined,
        expect.objectContaining({
          mutationKey: ['logout'],
        }),
      ),
    );
  });
});
