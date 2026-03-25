import type { Meta, StoryObj } from '@storybook/react-native';

import { useState } from 'react';
import { View } from 'react-native';

import { TextInput } from './text-input';

const meta = {
  title: 'Components/Ui/TextInput',
  component: TextInput,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 16, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const WithValue: Story = {
  render: args => {
    const [value, setValue] = useState('johndoe123');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const Password: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        {...args}
        value={value}
        onChangeText={setValue}
        placeholder="Password"
        secureTextEntry
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled Input',
    editable: false,
  },
};

export const CustomStyled: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        {...args}
        value={value}
        onChangeText={setValue}
        containerStyle={{
          borderWidth: 1,
          borderColor: 'blue',
          borderRadius: 8,
        }}
        style={{
          color: 'blue',
        }}
      />
    );
  },
};


export const NoLabel: Story = {
  args: {
    label: undefined,
  },
  render: args => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        {...args}
        value={value}
        onChangeText={setValue}
      />
    );
  },
};