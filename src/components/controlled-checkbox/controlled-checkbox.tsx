import { Checkbox, CheckboxProps } from '@ui-base/components/checkbox/checkbox';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form';

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'onValueChange' | 'value'
> & {
  fieldName: Path<T>;
  control?: Control<T>;
};

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  fieldName,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const methods = useFormContext<T>();
  const formControl = control || methods?.control;

  if (!formControl) {
    console.error(
      `ControlledCheckbox: 'control' is missing for field '${fieldName}'.`,
    );
    return null;
  }

  return (
    <Controller
      control={formControl}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Checkbox {...rest} value={value} onValueChange={onChange} />
      )}
    />
  );
};
