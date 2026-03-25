import { ReactNode, useState } from 'react';
import {
  Animated,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTabsAnimation } from './hooks/use-tabs-animation';
import { styles } from './styles';

export type TabItem = {
  children: ReactNode;
  key: string;
  label: string;
};

export type TabsProps = {
  tabs: TabItem[];
  activeKey?: string;
  activeLabelStyle?: StyleProp<TextStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (key: string) => void;
  tabStyle?: StyleProp<ViewStyle>;
};

export const Tabs = ({
  tabs,
  activeKey,
  onChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  labelStyle,
  activeLabelStyle,
}: TabsProps) => {
  const [selected, setSelected] = useState(activeKey || tabs[0]?.key);
  const {
    scale,
    contentOpacity,
    contentTranslateY,
    animatePress,
    animateContent,
  } = useTabsAnimation();

  const handlePress = (key: string) => {
    setSelected(key);
    onChange?.(key);
    animatePress();
    animateContent();
  };

  const activeTabContent = tabs.find(tab => tab.key === selected)?.children;

  return (
    <View style={styles.root}>
      <View style={[styles.container, containerStyle]}>
        {tabs.map(tab => {
          const isActive = tab.key === selected;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handlePress(tab.key)}
              activeOpacity={0.7}
              style={[
                styles.tab,
                tabStyle,
                isActive && [styles.activeTab, activeTabStyle],
                { width: `${100 / tabs.length}%` },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Animated.View style={{ transform: [{ scale }] }}>
                <Text
                  style={[
                    styles.label,
                    labelStyle,
                    isActive && [styles.activeLabel, activeLabelStyle],
                  ]}
                >
                  {tab.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.contentArea,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }],
          },
        ]}
      >
        {activeTabContent}
      </Animated.View>
    </View>
  );
};
