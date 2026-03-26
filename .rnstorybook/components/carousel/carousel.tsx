import { useRef, useState } from 'react';
import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import CarouselRn, {
  ICarouselInstance,
  TCarouselProps,
} from 'react-native-reanimated-carousel';
import { theme } from '../../theme/theme';
import { styles } from './styles';

export type CarouselProps = {
  data: string[];
  height?: number;
  showDots?: boolean;
} & Omit<TCarouselProps<string>, 'renderItem' | 'data' | 'mode' | 'modeConfig'>;

export const Carousel = ({
  showDots = true,
  height,
  onSnapToItem,
  data,
  ...restProps
}: CarouselProps) => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleSnapToItem = (idx: number) => {
    setIndex(idx);
    onSnapToItem?.(idx);
  };

  const scrollToIndex = (idx: number) => {
    if (idx === index) return;
    carouselRef.current?.scrollTo({ index: idx, animated: true });
  };

  return (
    <View style={styles.container}>
      <CarouselRn
        ref={carouselRef}
        {...restProps}
        data={data}
        width={width}
        height={height ?? width}
        onSnapToItem={handleSnapToItem}
        enabled={true}
        pagingEnabled
        snapEnabled
        loop={true}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {showDots && (
        <View style={styles.paginationContainer}>
          {data.map((_, i) => (
            <Pressable
              accessibilityRole="button"
              key={i}
              onPress={() => scrollToIndex(i)}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === index ? theme.colors.primary : theme.colors.textMuted,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};
