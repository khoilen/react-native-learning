import type { Meta, StoryObj } from '@storybook/react-native';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Ui/Checkbox',
  component: Checkbox,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Unchecked: Story = {
  args: {
    value: false,
  },
};

export const Checked: Story = {
  args: {
    value: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    value: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    value: true,
    disabled: true,
  },
};
