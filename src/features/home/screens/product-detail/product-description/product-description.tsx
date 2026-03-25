import { Text } from '@ui-base/components/text/text';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';

type ProductDescriptionProps = {
  description: string;
};

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="h2" style={styles.title}>
        Product Description
      </Text>

      <Text
        variant="bodySmall"
        style={styles.description}
        numberOfLines={isExpanded ? undefined : 4}
      >
        {description}
      </Text>

      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        <Text variant="bodySmall" style={styles.readMore}>
          {isExpanded ? 'Show less' : 'Read more...'}
        </Text>
      </Pressable>
    </View>
  );
};
