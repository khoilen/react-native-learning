import { Meta, StoryObj } from '@storybook/react-native';
import {
  Bell,
  CreditCard,
  Lock,
  Settings,
  ShoppingBag,
} from 'lucide-react-native';
import { View } from 'react-native';
import { theme } from '../../theme/theme';
import { MenuTile } from './menu-tile';

const meta: Meta<typeof MenuTile> = {
  title: 'Components/Ui/MenuTile',
  component: MenuTile,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.backgroundAlt,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MenuTile>;

export const OrderHistory: Story = {
  args: {
    title: 'Order History',
    icon: ShoppingBag,
  },
};

export const PaymentMethods: Story = {
  args: {
    title: 'Payment Methods',
    icon: CreditCard,
  },
};

export const MultipleItems: Story = {
  render: () => (
    <View style={{ gap: theme.spacing.m }}>
      <MenuTile title="Notifications" icon={Bell} />
      <MenuTile title="Privacy & Security" icon={Lock} />
      <MenuTile title="Settings" icon={Settings} />
    </View>
  ),
};
