import { ReactNode } from 'react';
import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  backgroundColor?: string;
  isFullWidth?: boolean;
  isLoading?: boolean;
  isOutline?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  styleInner?: StyleProp<ViewStyle>;
  testID?: string;
  variant?: 'primary' | 'secondary' | 'outline-gray' | 'icon' | 'tertiary';
};

const variantStyles = {
  primary: { container: styles.primary, text: styles.primaryText },
  secondary: { container: styles.secondary, text: styles.secondaryText },
  'outline-gray': {
    container: styles.outlineGray,
    text: styles.outlineGrayText,
  },
  icon: {
    container: styles.icon,
    text: {},
  },
  tertiary: {
    container: styles.tertiary,
    text: styles.tertiaryText,
  },
};

const textSizeStyles = {
  small: styles.smallText,
  medium: styles.mediumText,
  large: styles.largeText,
};

export const Button = ({
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  children,
  style,
  onPress,
  isFullWidth,
  isOutline,
  testID,
  disabled,
  styleInner,
  ...restProps
}: ButtonProps) => {
  const currentVariant = variantStyles[variant];
  const sizeStyle = styles[size];
  const textSizeStyle = textSizeStyles[size];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      activeOpacity={0.6}
      {...restProps}
      style={[
        isFullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        testID={testID}
        style={[
          styles.button,
          sizeStyle,
          isOutline ? styles.outline : currentVariant.container,
          !!backgroundColor && !isOutline && { backgroundColor },
          styleInner,
        ]}
      >
        {typeof children === 'string' && variant !== 'icon' ? (
          <Text
            style={[
              styles.buttonText,
              textSizeStyle,
              isOutline ? styles.outlineText : currentVariant.text,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};
