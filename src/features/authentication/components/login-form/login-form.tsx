import { Button } from '@ui-base/components/button/button';
import { Text, TouchableOpacity, View } from 'react-native';

import { ControlledCheckbox } from '@/components/controlled-checkbox/controlled-checkbox';
import { ControlledInput } from '@/components/controlled-input/controlled-input';
import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { Fingerprint } from 'lucide-react-native';
import { FormProvider, useForm } from 'react-hook-form';

import { theme } from '@ui-base/theme/theme';
import Toast from 'react-native-toast-message';
import { LoginResponse } from '../../api/login';
import { useLoginMutation } from '../../hooks/use-login-mutation/use-login-mutation';
import { styles } from './styles';

const DEFAULT_VALUES = {
  username: '',
  password: '',
  useBiometrics: false,
};

export type FormValues = {
  password: string;
  useBiometrics: boolean;
  username: string;
};

export const LoginForm = () => {
  const { setUser, setToken } = useAuthStore(state => state);

  const handleSuccess = (response: LoginResponse) => {
    const { user, token } = response.data;
    setUser(user);
    setToken(token);
    Toast.show({
      type: 'success',
      text1: 'Login Success',
      text2: `Welcome back, ${user.username}!`,
    });
  };

  const handleError = () => {
    Toast.show({
      type: 'error',
      text1: 'Login failed',
      text2: `Username and password is incorrect`,
    });
  };

  const { mutate: loginMutate, isPending } = useLoginMutation({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const methods = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = ({ password, username }: FormValues) => {
    loginMutate({ password, username });
  };
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <View style={styles.form}>
        <ControlledInput
          fieldName="username"
          label="Username"
          placeholder="Enter your username"
          rules={{ required: 'Username is required' }}
        />
        <ControlledInput
          fieldName="password"
          label="Password"
          secureTextEntry
          placeholder="Enter your password"
          rules={{ required: 'Password is required' }}
        />
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.cyanText}>Forgot Password?</Text>
        </TouchableOpacity>
        <ControlledCheckbox
          label="Use biometrics for faster login"
          fieldName="useBiometrics"
        />
        <View style={styles.singInContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            isFullWidth
            disabled={isPending}
          >
            Sing in
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            isFullWidth
            isOutline
            disabled={isPending}
          >
            <View style={styles.biometricView}>
              <Fingerprint size={20} color={theme.colors.primary} />
              <Text style={styles.biometricText}>Sign in with Biometrics</Text>
            </View>
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Or continue with</Text>
          <View style={styles.socialRow}>
            <Button style={styles.socialBtn} variant="outline-gray">
              Google
            </Button>
            <Button style={styles.socialBtn} variant="outline-gray">
              Facebook
            </Button>
          </View>
        </View>
        <Text style={styles.policyText}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </FormProvider>
  );
};
