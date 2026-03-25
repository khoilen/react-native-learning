import { Home as HomeScreen } from '@/features/home/screens/home/home';
import { ProductDetail as ProductDetailScreen } from '@features/home/screens/product-detail/product-detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackRoutes } from './home-stack-routes';

export type HomeStackParamList = {
  [HomeStackRoutes.HomeScreen]: undefined;
  [HomeStackRoutes.ProductDetailScreen]: { id: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={HomeStackRoutes.HomeScreen} component={HomeScreen} />
    <Stack.Screen
      name={HomeStackRoutes.ProductDetailScreen}
      component={ProductDetailScreen}
    />
  </Stack.Navigator>
);
