import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { Text, type TextProps } from './text';

const MOCK_TEXT = 'Hello World';

const defaultProps: TextProps = {
  children: MOCK_TEXT,
};

const setup = (props?: Partial<TextProps>) => {
  render(<Text {...defaultProps} {...props} />);
};

describe('Text Component', () => {
  it('renders the children correctly', () => {
    setup();
    expect(screen.getByText(MOCK_TEXT)).toBeOnTheScreen();
  });

  it('applies the default variant (body) styles', () => {
    setup();
    const textElement = screen.getByText(MOCK_TEXT);
    const flattenedStyle = StyleSheet.flatten(textElement.props.style);

    expect(flattenedStyle).toMatchObject(theme.typography.bodyMedium);
    expect(flattenedStyle.textAlign).toBe('left');
  });

  it('applies the correct styles for a specific variant (h1)', () => {
    setup({ variant: 'h1' });
    const textElement = screen.getByText(MOCK_TEXT);
    const flattenedStyle = StyleSheet.flatten(textElement.props.style);

    expect(flattenedStyle.fontSize).toBe(20);
    expect(flattenedStyle.fontWeight).toBe('700');
  });

  it('overrides the default color when the color prop is provided', () => {
    const customColor = '#FF0000';
    setup({ color: customColor });

    const textElement = screen.getByText(MOCK_TEXT);
    const flattenedStyle = StyleSheet.flatten(textElement.props.style);

    expect(flattenedStyle.color).toBe(customColor);
  });

  it('aligns text correctly based on the align prop', () => {
    setup({ align: 'center' });

    const textElement = screen.getByText(MOCK_TEXT);
    const flattenedStyle = StyleSheet.flatten(textElement.props.style);

    expect(flattenedStyle.textAlign).toBe('center');
  });

  it('merges and applies custom styles from the style prop', () => {
    const customStyle = { marginTop: 10, letterSpacing: 2 };
    setup({ style: customStyle });

    const textElement = screen.getByText(MOCK_TEXT);
    const flattenedStyle = StyleSheet.flatten(textElement.props.style);

    expect(flattenedStyle.marginTop).toBe(10);
    expect(flattenedStyle.letterSpacing).toBe(2);
  });

  it('passes through additional standard TextProps (e.g., numberOfLines)', () => {
    setup({ numberOfLines: 2 });

    const textElement = screen.getByText(MOCK_TEXT);
    expect(textElement.props.numberOfLines).toBe(2);
  });
});
