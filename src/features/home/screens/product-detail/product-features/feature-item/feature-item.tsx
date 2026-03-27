import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from './styles';

export type FeatureItemProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
};

export const FeatureItem = ({ Icon, label, value }: FeatureItemProps) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon size={18} color={theme.colors.primary} fontWeight={2} />
    </View>
    <View style={styles.textContainer}>
      <Text variant="caption">{label}</Text>
      <Text variant="bodySmall" style={styles.value}>
        {value}
      </Text>
    </View>
  </View>
);
