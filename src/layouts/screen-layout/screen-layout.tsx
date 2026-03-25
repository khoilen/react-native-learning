import {
  Breadcrumb,
  BreadcrumbProps,
} from '@ui-base/components/breadcrumb/breadcrumb';
import { theme } from '@ui-base/theme/theme';
import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

type ScreenLayoutProps = Omit<BreadcrumbProps, 'style'> & {
  children: ReactNode;
  backgroundColor?: string;
  scrollable?: boolean;
  styleBreadcrumb?: BreadcrumbProps['style'];
  stylesContent?: StyleProp<ViewStyle>;
  stylesWrapper?: StyleProp<ViewStyle>;
};

export const ScreenLayout = ({
  children,
  scrollable = true,
  backgroundColor = theme.colors.background,
  styleBreadcrumb,
  stylesWrapper,
  stylesContent,
  ...breadcrumbProps
}: ScreenLayoutProps) => {
  const ContentContainer = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, stylesWrapper]}>
      <Breadcrumb style={styleBreadcrumb} {...breadcrumbProps} />
      <ContentContainer
        style={[styles.content, stylesContent]}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ContentContainer>
    </SafeAreaView>
  );
};
