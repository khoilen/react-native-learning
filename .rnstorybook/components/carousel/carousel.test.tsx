import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import {
  ICarouselInstance,
  TCarouselProps,
} from 'react-native-reanimated-carousel';
import { TCarouselActionOptions } from 'react-native-reanimated-carousel/lib/typescript/types';
import { Carousel, CarouselProps } from './carousel';

jest.mock('react-native-reanimated-carousel', () => {
  const { forwardRef, useImperativeHandle } = require('react') as typeof React;
  const { View: RNView } = require('react-native');
  const MockCarousel = forwardRef<ICarouselInstance, TCarouselProps<string>>(
    (props, ref) => {
      useImperativeHandle(ref, () => ({
        scrollTo: (opts?: TCarouselActionOptions) => {
          if (typeof opts?.index === 'number') {
            props.onSnapToItem?.(opts.index);
          }
        },
        getCurrentIndex: () => 0,
        prev: () => {},
        next: () => {},
      }));

      return (
        <RNView testID="mock-carousel">
          {props.data.map((item: string, index: number) => (
            <RNView key={index} testID="carousel-item">
              {props.renderItem({
                item,
                index,
                animationValue: { value: 0 },
              } as never)}
            </RNView>
          ))}
        </RNView>
      );
    },
  );

  MockCarousel.displayName = 'MockCarousel';
  return MockCarousel;
});

const mockOnSnapToItem = jest.fn();

const defaultProps: CarouselProps = {
  data: ['https://test.com', 'https://test.com'],
  onSnapToItem: mockOnSnapToItem,
};

const setup = (props?: Partial<CarouselProps>) => {
  render(<Carousel {...defaultProps} {...props} />);
};

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with images', () => {
    setup();

    const images = screen.getAllByTestId('carousel-item');
    expect(images.length).toBe(defaultProps.data.length);
  });

  it('renders the correct number of pagination dots', () => {
    setup();

    const dots = screen.getAllByRole('button');
    expect(dots.length).toBe(2);
  });

  it('does not render dots when showDots is false', () => {
    setup({ showDots: false });

    const dots = screen.queryAllByRole('button');
    expect(dots.length).toBe(0);
  });

  it('updates the active dot color when a dot is pressed', () => {
    const { theme } = require('../../theme/theme');
    setup();

    const dots = screen.getAllByRole('button');

    fireEvent.press(dots[1]);

    expect(dots[1].props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: theme.colors.primary }),
    );
  });

  it('calls onSnapToItem when a manual snap is triggered', () => {
    setup();

    const dots = screen.getAllByRole('button');
    fireEvent.press(dots[1]);

    expect(mockOnSnapToItem).toHaveBeenCalledWith(1);
  });
});
