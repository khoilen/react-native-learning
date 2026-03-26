import { renderWithForm } from '@/tests/test-utils';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { ControlledInput } from './controlled-input';

type TestForm = {
  email: string;
};

const MOCK_LABEL = 'Email Address';

const setup = (props = {}, defaultValues?: TestForm) => {
  renderWithForm<TestForm>(
    <ControlledInput fieldName="email" label={MOCK_LABEL} {...props} />,
    { defaultValues: defaultValues ?? { email: '' } },
  );
};

describe('ControlledInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    setup();
    expect(screen.getByText(MOCK_LABEL)).toBeOnTheScreen();
  });

  it('initializes with the value from form state', () => {
    setup({}, { email: 'test@example.com' });

    const input = screen.getByLabelText(MOCK_LABEL);
    expect(input.props.value).toBe('test@example.com');
  });

  it('updates form state when text is changed', async () => {
    setup();
    const input = screen.getByLabelText(MOCK_LABEL);

    fireEvent.changeText(input, 'new@email.com');

    await waitFor(() => {
      expect(input.props.value).toBe('new@email.com');
    });
  });

  it('applies updateValue transformation if provided', async () => {
    const updateValue = (val: string) => val.toUpperCase();
    setup({ updateValue });

    const input = screen.getByLabelText(MOCK_LABEL);
    fireEvent.changeText(input, 'hello');

    await waitFor(() => {
      expect(input.props.value).toBe('HELLO');
    });
  });

  it('shows error message when validation fails', async () => {
    setup({ rules: { required: 'Email is required' } });

    const input = screen.getByLabelText(MOCK_LABEL);

    fireEvent(input, 'blur');

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeOnTheScreen();
    });
  });

  it('logs error if used outside of FormProvider', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ControlledInput fieldName="email" />);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("ControlledInput: 'control' is missing"),
    );

    consoleSpy.mockRestore();
  });
});
