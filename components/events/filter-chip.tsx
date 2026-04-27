import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import { useSubtlePressScale } from '@/hooks/use-subtle-press';
import { eventsStyles as styles } from '@/stylesheet/events.styles';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const { animatedStyle, onPressIn, onPressOut } = useSubtlePressScale();

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.chip, selected && styles.chipActive, animatedStyle]}>
      <Text style={[styles.chipText, selected && styles.chipTextActive]}>{label}</Text>
    </AnimatedPressable>
  );
}
