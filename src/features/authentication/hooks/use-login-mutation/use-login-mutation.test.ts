import { createWrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react-native';
import { loginRequest } from '../../api/login';
import {
  useLoginMutation,
  type UseLoginMutationOptions,
} from './use-login-mutation';

jest.mock('../../api/login', () => ({
  loginRequest: jest.fn(),
}));

const mockOnSuccess = jest.fn();

const MOCK_LOGIN_PARAMS = {
  username: 'johndoe',
  password: 'password123',
};

const MOCK_LOGIN_RESPONSE = {
  token: 'mock-token',
  user: { id: '1', name: 'John Doe' },
};

type SetupOptions = UseLoginMutationOptions & {
  onSuccess: () => void;
  mockError?: Error;
  mockResponse?: unknown;
};

const defaultOptions: SetupOptions = {
  mockError: undefined,
  mockResponse: MOCK_LOGIN_RESPONSE,
  onSuccess: mockOnSuccess,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { mockError, mockResponse, onSuccess } = {
    ...defaultOptions,
    ...options,
  };

  if (mockError) {
    (loginRequest as jest.Mock).mockRejectedValue(mockError);
  } else {
    (loginRequest as jest.Mock).mockResolvedValue(mockResponse);
  }

  return renderHook(() => useLoginMutation({ onSuccess }), {
    wrapper: createWrapper(),
  });
};

describe('useLoginMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls loginRequest with correct params when mutate is triggered', async () => {
    const { result } = setup();

    result.current.mutate(MOCK_LOGIN_PARAMS);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(loginRequest).toHaveBeenNthCalledWith(1, MOCK_LOGIN_PARAMS);
    expect(result.current.data).toEqual(MOCK_LOGIN_RESPONSE);
  });

  it('returns an error when loginRequest fails', async () => {
    const mockError = new Error('Unauthorized');
    const { result } = setup({
      mockError,
    });

    result.current.mutate(MOCK_LOGIN_PARAMS);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  it('triggers options callbacks like onSuccess', async () => {
    const { result } = setup();

    result.current.mutate(MOCK_LOGIN_PARAMS);

    await waitFor(() =>
      expect(mockOnSuccess).toHaveBeenNthCalledWith(
        1,
        MOCK_LOGIN_RESPONSE,
        MOCK_LOGIN_PARAMS,
        undefined,
        expect.objectContaining({
          mutationKey: ['login'],
        }),
      ),
    );
  });
});
