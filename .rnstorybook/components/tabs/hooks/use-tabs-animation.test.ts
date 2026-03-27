import { renderHook } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { useTabsAnimation } from './use-tabs-animation';

type AnimatedValueWithInternal = Animated.Value & { _value: number };

jest.spyOn(Animated, 'timing');
jest.spyOn(Animated, 'spring');
jest.spyOn(Animated, 'sequence');
jest.spyOn(Animated, 'parallel');

const setup = () => renderHook(() => useTabsAnimation());

describe('useTabsAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default animated values', () => {
    const { result } = setup();

    expect((result.current.scale as AnimatedValueWithInternal)._value).toBe(1);
    expect(
      (result.current.contentOpacity as AnimatedValueWithInternal)._value,
    ).toBe(1);
    expect(
      (result.current.contentTranslateY as AnimatedValueWithInternal)._value,
    ).toBe(0);
  });

  it('triggers the press animation sequence', () => {
    const { result } = setup();

    result.current.animatePress();

    expect(Animated.sequence).toHaveBeenCalled();
    expect(Animated.timing).toHaveBeenCalledWith(
      result.current.scale,
      expect.objectContaining({
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
    );
  });

  it('resets values and triggers parallel content animation', () => {
    const { result } = setup();

    result.current.animateContent();

    // Check reset values before the animation settles
    expect(
      (result.current.contentOpacity as AnimatedValueWithInternal)._value,
    ).toBe(0);
    expect(
      (result.current.contentTranslateY as AnimatedValueWithInternal)._value,
    ).toBe(10);

    expect(Animated.parallel).toHaveBeenCalled();
    expect(Animated.timing).toHaveBeenCalledWith(
      result.current.contentOpacity,
      expect.objectContaining({ toValue: 1, duration: 300 }),
    );
    expect(Animated.spring).toHaveBeenCalledWith(
      result.current.contentTranslateY,
      expect.objectContaining({ toValue: 0, friction: 8, tension: 40 }),
    );
  });

  it('ensures all animations use the native driver', () => {
    const { result } = setup();

    result.current.animatePress();
    result.current.animateContent();

    const allTimingCalls = (Animated.timing as jest.Mock).mock.calls;

    allTimingCalls.forEach(call => {
      const config = call[1] as Animated.TimingAnimationConfig;
      expect(config.useNativeDriver).toBe(true);
    });
  });
});
