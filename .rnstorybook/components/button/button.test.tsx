import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from 'react-native';
import { Button, ButtonProps } from './button';

const mockOnPress = jest.fn();
const testIDMock = 'testID';
const setup = (props?: Partial<ButtonProps>) => {
  const defaultProps: ButtonProps = {
    children: 'Button',
    onPress: mockOnPress,
    testID: testIDMock,
  };

  render(<Button {...defaultProps} {...props} />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Button', () => {
  it('renders correctly', () => {
    setup();

    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('renders text children', () => {
    setup({ children: 'Click me' });

    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    setup();

    fireEvent.press(screen.getByRole('button'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('does not crash when onPress is not provided', () => {
    setup({ onPress: undefined });

    fireEvent.press(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('renders custom children (non-string)', () => {
    setup({
      children: <Text testID="custom-child">Custom</Text>,
    });

    expect(screen.getByTestId('custom-child')).toBeOnTheScreen();
  });

  it('applies full width style', () => {
    setup({ isFullWidth: true });

    const button = screen.getByRole('button');

    expect(button.props.style).toEqual(
      expect.objectContaining({ width: '100%' }),
    );
  });

  it('applies outline style', () => {
    setup({ isOutline: true });

    const innerView = screen.getByTestId(testIDMock);

    expect(innerView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderWidth: 1 })]),
    );
  });

  it('applies custom backgroundColor when not outline', () => {
    setup({ backgroundColor: 'red' });

    const innerView = screen.getByTestId(testIDMock);

    expect(innerView.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' }),
      ]),
    );
  });

  it('does not apply backgroundColor when outline', () => {
    setup({ backgroundColor: 'red', isOutline: true });

    const innerView = screen.getByTestId(testIDMock);

    expect(innerView.props.style).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' }),
      ]),
    );
  });

  it('applies correct size styles', () => {
    setup({ size: 'large' });

    const innerView = screen.getByTestId(testIDMock);

    expect(innerView.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ paddingVertical: 12 }),
      ]),
    );
  });
});
