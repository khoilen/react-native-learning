import { Login as LoginScreen } from '@/features/authentication/screens/login/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationStackRoutes } from './authentication-stack-routes';

export type AuthenticationStackParamList = {
  [AuthenticationStackRoutes.LoginScreen]: undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

export const AuthenticationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={AuthenticationStackRoutes.LoginScreen}
      component={LoginScreen}
    />
  </Stack.Navigator>
);
