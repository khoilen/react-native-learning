import { http } from '@/services/http';
import { logOut } from './logout';

jest.mock('@/services/http', () => ({
  http: {
    post: jest.fn(),
  },
}));

const MOCK_LOGOUT_RESPONSE = {
  data: {
    message: 'Logout successful',
  },
  status: true,
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
};

const defaultOptions: SetupOptions = {
  mockResponse: { data: MOCK_LOGOUT_RESPONSE },
};

const setup = (options?: SetupOptions) => {
  const { mockError, mockResponse } = { ...defaultOptions, ...options };

  if (mockError) {
    (http.post as jest.Mock).mockRejectedValue(mockError);
  } else {
    (http.post as jest.Mock).mockResolvedValue(mockResponse);
  }

  return logOut();
};

describe('logOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends a POST request to /logout', async () => {
    const result = await setup();

    expect(http.post).toHaveBeenCalledWith('/logout');
    expect(result).toEqual(MOCK_LOGOUT_RESPONSE);
  });

  it('throws an error when the logout request fails', async () => {
    const mockError = new Error('Unauthorized');

    await expect(setup({ mockError })).rejects.toThrow('Unauthorized');
  });

  it('correctly extracts the data from the axios response', async () => {
    const customResponse = { data: { message: 'Custom success' } };
    const result = await setup({ mockResponse: customResponse });

    expect(result).toEqual(customResponse.data);
  });
});
