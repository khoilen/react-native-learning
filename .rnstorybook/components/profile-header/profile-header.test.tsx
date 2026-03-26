import { fireEvent, render, screen } from '@testing-library/react-native';
import { ProfileHeader, type ProfileHeaderProps } from './profile-header';

const MOCK_NAME = 'John Doe';
const MOCK_USERNAME = 'johndoe123';
const MOCK_AVATAR = 'https://example.com';
const mockOnEditPress = jest.fn();

const defaultProps: ProfileHeaderProps = {
  name: MOCK_NAME,
  username: MOCK_USERNAME,
  avatarUrl: MOCK_AVATAR,
  onEditPress: mockOnEditPress,
};

const setup = (props?: Partial<ProfileHeaderProps>) => {
  render(<ProfileHeader {...defaultProps} {...props} />);
};

describe('ProfileHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders name and username correctly', () => {
    setup();

    expect(screen.getByText(MOCK_NAME)).toBeOnTheScreen();
    expect(screen.getByText(`@${MOCK_USERNAME}`)).toBeOnTheScreen();
  });

  it('renders the avatar image with correct source', () => {
    setup();

    const avatar = screen.UNSAFE_queryByType(require('react-native').Image);
    expect(avatar?.props.source).toEqual({ uri: MOCK_AVATAR });
  });

  it('calls onEditPress when the edit button is pressed', () => {
    setup();

    fireEvent.press(screen.getByRole('button'));

    expect(mockOnEditPress).toHaveBeenCalledTimes(1);
  });

  it('shows premium badge when isPremium is true', () => {
    setup({ isPremium: true });

    expect(screen.getByText('PREMIUM MEMBER')).toBeOnTheScreen();
  });

  it('hides premium badge when isPremium is false', () => {
    setup({ isPremium: false });

    expect(screen.queryByText('PREMIUM MEMBER')).toBeNull();
  });

  it('renders the Pencil icon inside the edit button', () => {
    setup();

    const icon = screen.UNSAFE_queryByType(
      require('lucide-react-native').Pencil,
    );

    expect(icon).toBeTruthy();
    expect(icon?.props.size).toBe(16);
  });
});
