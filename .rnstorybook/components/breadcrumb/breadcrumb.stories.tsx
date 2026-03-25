import type { Meta, StoryObj } from '@storybook/react-native';
import { Bell, MoreVertical, Share2 } from 'lucide-react-native';
import { View } from 'react-native';
import { theme } from '../../theme/theme';
import { Breadcrumb } from './breadcrumb';

const BreadcrumbMeta: Meta<typeof Breadcrumb> = {
  title: 'Components/Ui/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    onBackPress: { action: 'back pressed' },
  },
  decorators: [
    Story => (
      <View
        style={{
          padding: 16,
          backgroundColor: theme.colors.background,
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default BreadcrumbMeta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    title: 'Product Details',
    showBack: true,
  },
};

export const WithRightIcon: Story = {
  args: {
    title: 'Settings',
    rightIcon: <Bell size={24} color={theme.colors.text} />,
  },
};

export const NoBackButton: Story = {
  args: {
    title: 'Discover',
    showBack: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long product title that should truncate',
    rightIcon: <MoreVertical size={24} color={theme.colors.text} />,
  },
};

export const FullHeader: Story = {
  args: {
    title: 'Checkout',
    rightIcon: <Share2 size={24} color={theme.colors.primary} />,
    onBackPress: () => console.log('Custom Back Action'),
  },
};
