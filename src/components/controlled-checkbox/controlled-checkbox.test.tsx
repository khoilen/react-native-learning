import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ControlledCheckbox } from './controlled-checkbox';

type TestForm = FieldValues & {
  terms: boolean;
};

type FormWrapperProps = {
  children: React.ReactNode;
  defaultValues?: TestForm;
};

const FormWrapper = ({
  children,
  defaultValues = { terms: false },
}: FormWrapperProps) => {
  const methods = useForm<TestForm>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const MOCK_LABEL = 'Accept Terms';

const setup = (defaultValues?: TestForm) => {
  render(
    <FormWrapper defaultValues={defaultValues}>
      <ControlledCheckbox fieldName="terms" label={MOCK_LABEL} />
    </FormWrapper>,
  );
};

describe('ControlledCheckbox', () => {
  it('renders correctly with the provided label', () => {
    setup();
    expect(screen.getByText(MOCK_LABEL)).toBeOnTheScreen();
  });

  it('initializes with the correct value from the form state', () => {
    setup({ terms: true });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.props.accessibilityValue.text).toBe('checked');
  });

  it('updates the form state when the checkbox is pressed', () => {
    setup({ terms: false });
    const checkbox = screen.getByRole('checkbox');

    fireEvent.press(checkbox);

    expect(checkbox.props.accessibilityValue.text).toBe('checked');
  });

  it('logs an error and returns null if no form context is found', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ControlledCheckbox<TestForm> fieldName="terms" />);

    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("ControlledCheckbox: 'control' is missing"),
    );

    consoleSpy.mockRestore();
  });
});
