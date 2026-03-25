import { MainTabs } from '@/components/main-tabs/main-tabs';
import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { SplashScreen } from '@/screens/splash-screen/splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationStack } from './stack-navigators/authentication-stack/authentication-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user, isLoading } = useAuthStore(state => state);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ animation: 'fade' }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthenticationStack}
          options={{ animation: 'fade' }}
        />
      )}
    </Stack.Navigator>
  );
};
