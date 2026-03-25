import { LockIcon } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { LoginForm } from '@features/authentication/components/login-form/login-form';
import { SignupForm } from '@features/authentication/components/signup-form/signup-form';
import { Tabs } from '@ui-base/components/tabs/tabs';
import { theme } from '@ui-base/theme/theme';
import { styles } from './styles';

const tabs = [
  { key: 'login', label: 'Login', children: <LoginForm /> },
  { key: 'signup', label: 'Sign Up', children: <SignupForm /> },
];

export const Login = () => (
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.formContainer}>
      <View style={styles.headerIconContainer}>
        <View style={styles.iconCircle}>
          <LockIcon size={28} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please enter your details</Text>
      </View>
      <Tabs tabs={tabs} />
    </View>
  </ScrollView>
);
