import { theme } from '@ui-base/theme/theme';
import { forwardRef, ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextInputProps as TextInputPropsRN,
  TextInput as TextInputRN,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

export type TextInputProps = TextInputPropsRN & {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<TextStyle>;
};

export const TextInput = forwardRef<TextInputRN, TextInputProps>(
  (
    {
      containerStyle,
      style,
      label,
      labelStyle,
      error,
      errorStyle,
      leftIcon,
      rightIcon,
      inputContainerStyle,
      editable = true,
      ...props
    },
    ref,
  ) => (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <View
        style={[
          styles.inputContainer,
          !!error && styles.inputError,
          !editable && styles.disabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInputRN
          ref={ref}
          accessibilityRole="text"
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textLight}
          autoCapitalize="none"
          editable={editable}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  ),
);

TextInput.displayName = 'TextInput';
