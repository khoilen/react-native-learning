import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextInput, TextInputProps } from './text-input';

const mockHandleChange = jest.fn();

const defaultProps: TextInputProps = {
  placeholder: 'Enter text',
  value: '',
  onChangeText: mockHandleChange,
};

const setup = (props?: Partial<TextInputProps>) => {
  render(<TextInput {...defaultProps} {...props} />);
};

describe('TextInput', () => {
  it('renders input', () => {
    setup();

    expect(screen.getByRole('text')).toBeOnTheScreen();
  });

  it('renders label when provided', () => {
    setup({ label: 'Username' });

    expect(screen.getByText('Username')).toBeOnTheScreen();
  });

  it('does not render label when not provided', () => {
    setup();

    expect(screen.queryByText('Username')).toBeNull();
  });

  it('calls onChangeText when typing', () => {
    setup();

    fireEvent.changeText(screen.getByRole('text'), 'hello');

    expect(mockHandleChange).toHaveBeenCalledWith('hello');
  });

  it('renders controlled value', () => {
    setup({ value: 'test value' });

    expect(screen.getByDisplayValue('test value')).toBeOnTheScreen();
  });

  it('applies custom style', () => {
    setup({ style: { color: 'red' } });

    const input = screen.getByRole('text');

    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red' })]),
    );
  });

  it('is disabled when editable=false', () => {
    setup({ value: 'Disabled', editable: false });

    const input = screen.getByRole('text');

    expect(input.props.editable).toBe(false);
  });
});
