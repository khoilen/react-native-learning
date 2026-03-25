import { Meta, StoryObj } from '@storybook/react-native';
import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/ui/Carousel',
  component: Carousel,
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    data: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    ],
  },
};

export const SingleImage: Story = {
  args: {
    data: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
  },
};
