import { Saved as SavedScreen } from '@features/saved/screens/saved/saved';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SavedStackRoutes } from './saved-stack-routes';



export type SavedStackParamList = {
  [SavedStackRoutes.SavedScreen]: undefined;
};

const Stack = createNativeStackNavigator<SavedStackParamList>();

export const SavedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SavedStackRoutes.SavedScreen} component={SavedScreen} />
  </Stack.Navigator>
);
