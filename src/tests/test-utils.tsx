import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactNode } from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form';

type FormWrapperProps<T extends FieldValues> = {
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
};

const FormWrapper = <T extends FieldValues>({
  children,
  defaultValues,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({ defaultValues, mode: 'onBlur' });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const renderWithForm = <T extends FieldValues>(
  ui: React.ReactElement,
  {
    defaultValues,
    ...options
  }: { defaultValues?: DefaultValues<T> } & Omit<RenderOptions, 'wrapper'> = {},
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <FormWrapper<T> defaultValues={defaultValues}>{children}</FormWrapper>
    ),
    ...options,
  });
