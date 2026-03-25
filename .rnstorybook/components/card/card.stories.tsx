import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/ui/Card',
  component: Card,
  argTypes: {
    onFavoritePress: { action: 'toggled favorite' },
  },
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundAlt,
          padding: theme.spacing.m,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Sonic Wireless',
    caption: 'Electronics',
    imageSource: { uri: 'https://placehold.jp' },
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Premium Wireless Noise Cancelling Headphones Gen 2',
  },
};

export const SalePrice: Story = {
  args: {
    ...Default.args,
    caption: 'On Sale',
  },
};
