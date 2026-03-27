import { render, screen } from '@testing-library/react-native';
import { ReactNode } from 'react';
import {
  BaseToastProps,
  ErrorToast,
  SuccessToast,
} from 'react-native-toast-message';
import { toastStyles } from './styles';
import { Toast } from './toast';

jest.mock('react-native-toast-message', () => {
  const { View } = require('react-native');

  type MockRNToastProps = {
    config: Record<string, (props: BaseToastProps) => ReactNode>;
  };

  const MockToast = (props: MockRNToastProps) => (
    <View testID="toast-container">
      {props.config.error({ text1: 'Error' })}
      {props.config.success({ text1: 'Success' })}
    </View>
  );

  return {
    __esModule: true,
    default: MockToast,
    ErrorToast: (props: BaseToastProps) => <View {...props} />,
    SuccessToast: (props: BaseToastProps) => <View {...props} />,
  };
});

describe('Toast', () => {
  const setup = () => {
    render(<Toast />);
  };

  it('renders the RNToast component with the correct config', () => {
    setup();
    expect(screen.getByTestId('toast-container')).toBeOnTheScreen();
  });

  it('configures ErrorToast with the correct styles and props', () => {
    setup();

    const errorToast = screen.UNSAFE_queryByType(ErrorToast);

    expect(errorToast?.props.style).toContainEqual(toastStyles.base);
    expect(errorToast?.props.style).toContainEqual(toastStyles.errorBorder);
    expect(errorToast?.props.text1Style).toEqual(toastStyles.title);
    expect(errorToast?.props.text1NumberOfLines).toBe(0);
    expect(errorToast?.props.text2NumberOfLines).toBe(0);
  });

  it('configures SuccessToast with the correct styles', () => {
    setup();

    const successToast = screen.UNSAFE_queryByType(SuccessToast);

    expect(successToast?.props.style).toContainEqual(toastStyles.base);
    expect(successToast?.props.style).toContainEqual(toastStyles.successBorder);
    expect(successToast?.props.contentContainerStyle).toEqual(
      toastStyles.contentContainer,
    );
    expect(successToast?.props.text2Style).toEqual(toastStyles.description);
  });
});
