import { http } from '@/services/http';
import { loginRequest, type LoginParams } from './login';

jest.mock('@/services/http', () => ({
  http: {
    post: jest.fn(),
  },
}));

const MOCK_CREDENTIALS: LoginParams = {
  username: 'johndoe',
  password: 'password123',
};

const MOCK_RESPONSE = {
  data: {
    token: 'mock-token',
    user: { id: '1', name: 'John Doe' },
  },
  status: true,
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
};

const defaultOptions: SetupOptions = {
  mockResponse: { data: MOCK_RESPONSE },
};

const setup = (options?: SetupOptions) => {
  const { mockError, mockResponse } = { ...defaultOptions, ...options };

  if (mockError) {
    (http.post as jest.Mock).mockRejectedValue(mockError);
  } else {
    (http.post as jest.Mock).mockResolvedValue(mockResponse);
  }

  return loginRequest(MOCK_CREDENTIALS);
};

describe('loginRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends a POST request to /login with correct credentials', async () => {
    const result = await setup();

    expect(http.post).toHaveBeenCalledWith('/login', MOCK_CREDENTIALS);
    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('throws an error when the http service fails', async () => {
    const mockError = new Error('Network Error');

    await expect(setup({ mockError })).rejects.toThrow('Network Error');
  });

  it('returns the data property from the axios response', async () => {
    const customResponse = { data: { custom: 'data' } };
    const result = await setup({ mockResponse: customResponse });

    expect(result).toEqual(customResponse.data);
  });
});
