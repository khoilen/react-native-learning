import { HomeStack } from '@/navigation/stack-navigators/home-stack/home-stack';
import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import { ProfileStack } from '@/navigation/stack-navigators/profile-stack/profile-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomTabs } from '@ui-base/components/bottom-tabs/bottom-tabs';
import { Heart, LayoutGrid, ShoppingBag, User } from 'lucide-react-native';
import { Placeholder } from '../placeholder/placeholde';

const HIDDEN_ROUTES = [HomeStackRoutes.ProductDetailScreen];

const TAB_CONFIG = [
  { name: 'Shop', component: HomeStack, icon: ShoppingBag },
  {
    name: 'Categories',
    component: () => <Placeholder name="Categories" />,
    icon: LayoutGrid,
  },
  { name: 'Saved', component: () => <Placeholder name="Saved" />, icon: Heart },
  { name: 'Profile', component: ProfileStack, icon: User },
];

type MainTabsProps = {
  testIdBottomBar?: string;
};

export const MainTabs = ({ testIdBottomBar }: MainTabsProps) => (
  <BottomTabs
    tabs={TAB_CONFIG}
    testIdBottomBar={testIdBottomBar}
    screenOptions={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
      const shouldHide = HIDDEN_ROUTES.includes(routeName as HomeStackRoutes);

      return {
        tabBarStyle: [{ display: shouldHide ? 'none' : 'flex' }],
      };
    }}
  />
);
