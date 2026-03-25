import { Check } from 'lucide-react-native';
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export type CheckboxProps = {
  onValueChange: (newValue: boolean) => void;
  value: boolean;
  disabled?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox = ({
  value,
  onValueChange,
  disabled = false,
  style,
  label,
  labelStyle
}: CheckboxProps) => (
  <Pressable
    accessibilityRole="checkbox"
    accessibilityState={{ checked: value, disabled }}
    onPress={() => !disabled && onValueChange(!value)}
    style={[styles.container, disabled && styles.disabled, style]}
  >
    <View style={[styles.box, value && styles.checked]}>
      {value && <Check size={16} />}
    </View>
    {label && (
      <Text
        style={[
          styles.label,
          disabled && styles.disabledLabel,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    )}
  </Pressable>
);
