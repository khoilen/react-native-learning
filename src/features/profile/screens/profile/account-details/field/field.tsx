import {
  ControlledInput,
  ControlledInputProps,
} from '@/components/controlled-input/controlled-input';
import { Text } from '@ui-base/components/text/text';
import { FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { FormValues } from '../account-details';
import { styles } from './styles';

export type FieldProps = Pick<ControlledInputProps<FieldValues>, 'rules'> & {
  fieldName: keyof FormValues;
  label: string;
  value: string;
  isEditable?: boolean;
  isInput?: boolean;
};

export const Field = ({
  label,
  value,
  fieldName,
  isInput,
  isEditable = true,
  rules,
}: FieldProps) => (
  <View style={styles.fieldContainer}>
    <Text variant="caption" style={styles.label}>
      {label.toUpperCase()}
    </Text>
    {isInput ? (
      <ControlledInput
        fieldName={fieldName}
        rules={rules}
        key={`${fieldName}-${isEditable}`}
        editable={isEditable}
      />
    ) : (
      <Text variant="body" style={styles.valueText}>
        {value}
      </Text>
    )}
  </View>
);
