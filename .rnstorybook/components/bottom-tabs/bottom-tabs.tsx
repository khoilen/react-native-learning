import {
  BottomTabBar,
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { LucideIcon } from 'lucide-react-native';
import { ComponentProps, ComponentType } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { styles } from './styles';

export type TabItem = {
  component: ComponentType;
  icon: LucideIcon;
  name: string;
  options?: BottomTabNavigationOptions;
};

type TabNavigatorProps = Omit<ComponentProps<typeof Tab.Navigator>, 'children'>;

const TabBarWrapper = (
  props: BottomTabBarProps & { testIdBottomBar?: string },
) => {
  const { state, descriptors, testIdBottomBar } = props;
  const route = state.routes[state.index];
  const { options } = descriptors[route.key];

  return (
    <View
      testID={testIdBottomBar}
      style={options.tabBarStyle as StyleProp<ViewStyle>}
    >
      <BottomTabBar {...props} />
    </View>
  );
};

export type BottomTabsProps = TabNavigatorProps & {
  tabs: TabItem[];
  testIdBottomBar?: string;
};

const Tab = createBottomTabNavigator();

export const BottomTabs = ({
  tabs,
  screenOptions,
  testIdBottomBar,
  ...props
}: BottomTabsProps) => (
  <Tab.Navigator
    {...props}
    tabBar={tabProps => (
      <TabBarWrapper testIdBottomBar={testIdBottomBar!} {...tabProps} />
    )}
    screenOptions={navProps => {
      const userOptions =
        typeof screenOptions === 'function'
          ? screenOptions(navProps)
          : screenOptions;

      return {
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: [styles.tabBar, userOptions?.tabBarStyle],
        ...userOptions,
      };
    }}
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
