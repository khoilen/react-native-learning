import { theme } from '@ui-base/theme/theme';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

export type LoadingProps = ActivityIndicatorProps & {
  color?: string;
};

export const Loading = ({ color, ...restProps }: LoadingProps) => (
  <ActivityIndicator
    color={theme.colors.primary ?? color}
    accessibilityRole="progressbar"
    {...restProps}
  />
);
