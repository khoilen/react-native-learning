import {
  TextInput,
  TextInputProps,
} from '@ui-base/components/text-input/text-input';
import { ForwardedRef, forwardRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native';

export type ControlledInputProps<T extends FieldValues> = Omit<
  TextInputProps,
  'onChangeText' | 'value'
> & {
  fieldName: Path<T>;
  control?: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  updateValue?: (value: string) => string;
};

export const ControlledInput = forwardRef(
  <T extends FieldValues>(
    {
      control,
      fieldName,
      updateValue,
      rules,
      ...rest
    }: ControlledInputProps<T>,
    ref: ForwardedRef<RNTextInput>,
  ) => {
    const methods = useFormContext<T>();
    const formControl = control || methods?.control;

    if (!formControl) {
      console.error(
        `ControlledInput: 'control' is missing for field '${fieldName}'. Wrap in FormProvider or pass control prop.`,
      );
      return null;
    }

    return (
      <Controller
        control={formControl}
        name={fieldName}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref: fieldRef },
          fieldState: { error },
        }) => {
          const onChangeText = (val: string) => {
            const modifiedVal = updateValue ? updateValue(val) : val;
            onChange(modifiedVal);
          };

          return (
            <TextInput
              ref={node => {
                fieldRef(node);
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
              }}
              onBlur={onBlur}
              onChangeText={onChangeText}
              value={value}
              error={error?.message}
              {...rest}
            />
          );
        }}
      />
    );
  },
);

ControlledInput.displayName = 'ControlledInput';
