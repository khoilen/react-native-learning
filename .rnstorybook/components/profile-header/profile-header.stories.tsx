import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { theme } from '../../theme/theme';
import { ProfileHeader, ProfileHeaderProps } from './profile-header';

const meta: Meta<ProfileHeaderProps> = {
  title: 'Components/Ui/ProfileHeader',
  component: ProfileHeader,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.backgroundMuted,
        }}
      >
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onEditPress: { action: 'onEditPress' },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe_official',
    avatarUrl: 'https://i.pravatar.cc',
    isPremium: false,
  },
};

export const Premium: Story = {
  args: {
    ...Default.args,
    isPremium: true,
  },
};

export const LongName: Story = {
  args: {
    ...Default.args,
    name: 'Johnathan Alexander Doe III',
    username: 'long_username_example_test',
  },
};
