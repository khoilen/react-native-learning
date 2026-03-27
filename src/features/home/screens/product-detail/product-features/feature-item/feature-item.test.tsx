import { render, screen } from '@testing-library/react-native';
import { LucideIcon } from 'lucide-react-native';
import { FeatureItem, type FeatureItemProps } from './feature-item';

const MockIcon = jest.fn(() => null) as unknown as LucideIcon;

const defaultProps: FeatureItemProps = {
  Icon: MockIcon,
  label: 'Test Label',
  value: 'Test Value',
};

const setup = (props?: Partial<FeatureItemProps>) =>
  render(<FeatureItem {...defaultProps} {...props} />);

describe('FeatureItem', () => {
  it('renders the label and value correctly', () => {
    setup();

    expect(screen.getByText(defaultProps.label)).toBeTruthy();
    expect(screen.getByText(defaultProps.value)).toBeTruthy();
  });

  it('renders the provided icon', () => {
    setup();

    expect(MockIcon).toHaveBeenCalled();
  });

  it('passes correct props to the icon', () => {
    setup();

    expect(MockIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 18,
        fontWeight: 2,
      }),
      undefined,
    );
  });
});
