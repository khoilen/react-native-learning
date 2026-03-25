import RNToast, {
  BaseToastProps,
  ErrorToast,
  SuccessToast,
} from 'react-native-toast-message';
import { toastStyles } from './styles';

const toastConfig = {
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[toastStyles.base, toastStyles.errorBorder]}
      contentContainerStyle={toastStyles.contentContainer}
      text1Style={toastStyles.title}
      text2Style={toastStyles.description}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      style={[toastStyles.base, toastStyles.successBorder]}
      contentContainerStyle={toastStyles.contentContainer}
      text1Style={toastStyles.title}
      text2Style={toastStyles.description}
    />
  ),
};

export const Toast = () => <RNToast config={toastConfig} />;
