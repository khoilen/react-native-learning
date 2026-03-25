import { Profile as ProfileScreen } from '@features/profile/screens/profile/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackRoutes } from './profile-stack-routes';

export type ProfileStackParamList = {
  [ProfileStackRoutes.ProfileScreen]: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen 
      name={ProfileStackRoutes.ProfileScreen} 
      component={ProfileScreen} 
    />
  </Stack.Navigator>
);
