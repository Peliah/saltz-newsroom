import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import { useSubtlePressScale } from '@/hooks/use-subtle-press';
import { authStyles as styles } from '@/stylesheet/auth.styles';

type CustomButtonProps = {
  label: string;
  onPress?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CustomButton({ label, onPress }: CustomButtonProps) {
  const { animatedStyle, onPressIn, onPressOut } = useSubtlePressScale();

  return (
    <AnimatedPressable
      style={[styles.primaryButton, animatedStyle]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </AnimatedPressable>
  );
}
