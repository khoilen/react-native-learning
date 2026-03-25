import { useState } from 'react';
import { Animated } from 'react-native';

export const useTabsAnimation = () => {
  const [scale] = useState(() => new Animated.Value(1));
  const [contentOpacity] = useState(() => new Animated.Value(1));
  const [contentTranslateY] = useState(() => new Animated.Value(0));

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateContent = () => {
    contentOpacity.setValue(0);
    contentTranslateY.setValue(10);

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(contentTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    scale,
    contentOpacity,
    contentTranslateY,
    animatePress,
    animateContent,
  };
};
