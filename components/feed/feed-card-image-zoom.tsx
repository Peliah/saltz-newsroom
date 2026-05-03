import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

const SCALE_HOVER = 1.065;
const MS_IN = 220;
const MS_OUT = 260;

type Props = {
  hovered: boolean;
  hostStyle: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * Image hover zoom on the native UI thread (`useNativeDriver: true` for transform).
 * Works on iOS, Android, macOS, and web; avoids the macOS Reanimated stub.
 */
export function FeedCardImageZoom({ hovered, hostStyle, children }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: hovered ? SCALE_HOVER : 1,
      duration: hovered ? MS_IN : MS_OUT,
      useNativeDriver: true,
    }).start();
  }, [hovered, scale]);

  return (
    <Animated.View style={[hostStyle, { transform: [{ scale }] }]}>
      {children}
    </Animated.View>
  );
}
