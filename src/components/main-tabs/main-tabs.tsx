import { HomeStack } from '@/navigation/stack-navigators/home-stack/home-stack'; // Your existing stack
import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { theme } from '@ui-base/theme/theme';
import { Heart, LayoutGrid, ShoppingBag, User } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const HIDDEN_TAB_ROUTES = [HomeStackRoutes.ProductDetailScreen];

export const Tab = createBottomTabNavigator();

const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? '';
      const shouldHide = HIDDEN_TAB_ROUTES.includes(
        routeName as HomeStackRoutes,
      );
      return {
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: [
          styles.tabBar,
          {
            display: shouldHide ? 'none' : 'flex',
            backgroundColor: theme.colors.background,
          },
        ],
      };
    }}
  >
    <Tab.Screen
      name="Shop"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Categories"
      component={() => <Placeholder name="Categories" />}
      options={{
        tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Saved"
      component={() => <Placeholder name="Saved" />}
      options={{
        tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={() => <Placeholder name="Profile" />}
      options={{
        tabBarIcon: ({ color }) => <User size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);
