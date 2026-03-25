import type { Meta, StoryObj } from '@storybook/react-native';
import { Check } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { TabItem, Tabs, TabsProps } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Ui/Tabs',
  component: Tabs,
  decorators: [
    Story => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const textTabs: TabItem[] = [
  { key: 'home', children: <Text>Home</Text>, label: 'Home' },
  { key: 'profile', children: <Text>Profile</Text>, label: 'Profile' },
  { key: 'settings', children: <Text>Settings</Text>, label: 'Home' },
];

const iconTabs: TabItem[] = [
  { key: 'home', children: <Text>Home</Text>, label: 'Home' },
  { key: 'profile', children: <Text>Profile</Text>, label: 'Profile' },
  {
    key: 'settings',
    children: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Settings</Text>
        <Check size={16} />
      </View>
    ),
    label: 'Home',
  },
];

export const Default: Story = {
  args: {
    tabs: textTabs,
  } satisfies TabsProps,
};

export const WithIcons: Story = {
  args: {
    tabs: iconTabs,
  } satisfies TabsProps,
};

export const FullWidthContainer: Story = {
  render: () => (
    <View style={{ flex: 1 }}>
      <Tabs
        tabs={textTabs}
        containerStyle={{ justifyContent: 'space-around', width: '100%' }}
      />
    </View>
  ),
};
