import { fireEvent, render, screen } from '@testing-library/react-native';
import { Checkbox } from './checkbox';

const mockOnValueChange = jest.fn();

const defaultProps = {
  value: false,
  onValueChange: mockOnValueChange,
};

const setup = (props = {}) => {
  render(<Checkbox {...defaultProps} {...props} />);
};

describe('Checkbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    setup();

    expect(screen.getByRole('checkbox')).toBeOnTheScreen();
  });

  it('calls onValueChange with true when pressed (unchecked -> checked)', () => {
    setup({ value: false });

    fireEvent.press(screen.getByRole('checkbox'));

    expect(mockOnValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange with false when pressed (checked -> unchecked)', () => {
    setup({ value: true });

    fireEvent.press(screen.getByRole('checkbox'));

    expect(mockOnValueChange).toHaveBeenCalledWith(false);
  });

  it('does not call onValueChange when disabled', () => {
    setup({
      value: false,
      disabled: true,
    });

    fireEvent.press(screen.getByRole('checkbox'));

    expect(mockOnValueChange).not.toHaveBeenCalled();
  });

  it('renders check icon when value is true', () => {
    setup({ value: true });

    const icon = screen.UNSAFE_queryByType(
      require('lucide-react-native').Check,
    );

    expect(icon).toBeTruthy();
  });

  it('does not render check icon when value is false', () => {
    setup({ value: false });

    const icon = screen.UNSAFE_queryByType(
      require('lucide-react-native').Check,
    );

    expect(icon).toBeNull();
  });
});
