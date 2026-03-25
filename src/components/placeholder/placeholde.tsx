import { Text } from '@ui-base/components/text/text';
import { View } from 'lucide-react-native';

export const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);
