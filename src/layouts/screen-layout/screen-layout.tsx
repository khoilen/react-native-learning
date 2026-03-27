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

type ScreenLayoutProps = Omit<BreadcrumbProps, 'style' | 'title'> & {
  children: ReactNode;
  backgroundColor?: string;
  scrollable?: boolean;
  styleBreadcrumb?: BreadcrumbProps['style'];
  stylesContent?: StyleProp<ViewStyle>;
  stylesWrapper?: StyleProp<ViewStyle>;
  title?: string;
};

export const ScreenLayout = ({
  children,
  scrollable = true,
  backgroundColor = theme.colors.background,
  styleBreadcrumb,
  stylesWrapper,
  stylesContent,
  title,
  ...breadcrumbProps
}: ScreenLayoutProps) => {
  const ContentContainer = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, stylesWrapper]}>
      {title && (
        <Breadcrumb
          style={styleBreadcrumb}
          title={title}
          {...breadcrumbProps}
        />
      )}
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
