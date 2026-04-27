import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const PRESS_IN_MS = 85;
const PRESS_OUT_MS = 140;
const SCALE = 0.985;

/**
 * Restrained press feedback for editorial UI (slight scale, no bouncy spring).
 */
export function useSubtlePressScale() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    animatedStyle,
    onPressIn: () => {
      scale.value = withTiming(SCALE, { duration: PRESS_IN_MS });
    },
    onPressOut: () => {
      scale.value = withTiming(1, { duration: PRESS_OUT_MS });
    },
  };
}
