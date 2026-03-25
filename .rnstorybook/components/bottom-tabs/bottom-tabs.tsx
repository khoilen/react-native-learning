import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { LucideIcon } from 'lucide-react-native';
import { ComponentProps, ComponentType } from 'react';
import { theme } from '../../theme/theme';
import { styles } from './styles';

export type TabItem = {
  component: ComponentType;
  icon: LucideIcon;
  name: string;
  options?: BottomTabNavigationOptions;
};

type TabNavigatorProps = Omit<ComponentProps<typeof Tab.Navigator>, 'children'>;

export type BottomTabsProps = TabNavigatorProps & {
  tabs: TabItem[];
};

const Tab = createBottomTabNavigator();

export const BottomTabs = ({
  tabs,
  screenOptions,
  ...props
}: BottomTabsProps) => (
  <Tab.Navigator
    {...props}
    screenOptions={navProps => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarItemStyle: styles.tabItem,
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabBar,
      ...(typeof screenOptions === 'function'
        ? screenOptions(navProps)
        : screenOptions),
    })}
  >
    {tabs.map(({ name, component, icon: Icon, options }) => (
      <Tab.Screen
        key={name}
        name={name}
        component={component}
        options={{
          ...options,
          tabBarIcon: iconProps => <Icon {...iconProps} size={24} />,
        }}
      />
    ))}
  </Tab.Navigator>
);
