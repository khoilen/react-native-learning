import { Text } from '@ui-base/components/text/text';
import { Battery, Droplets, ShieldCheck, Zap } from 'lucide-react-native';
import { View } from 'react-native';
import { FeatureItem } from './feature-item/feature-item';
import { styles } from './styles';

export const ProductFeatures = () => (
  <View style={styles.container}>
    <Text variant="heading" style={styles.header}>
      Key Features
    </Text>
    <View style={styles.grid}>
      <FeatureItem Icon={Battery} label="Battery" value="48 Hours" />
      <FeatureItem Icon={Zap} label="Sync" value="Bluetooth 5.2" />
      <FeatureItem Icon={Droplets} label="Water" value="5ATM Resist" />
      <FeatureItem Icon={ShieldCheck} label="Warranty" value="12 Months" />
    </View>
  </View>
);
