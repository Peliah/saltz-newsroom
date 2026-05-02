/**
 * macOS (react-native-macos) cannot initialize Reanimated / Worklets in this project’s setup.
 * Metro maps `react-native-reanimated` to this file when `platform === 'macos'`.
 * Layout and press animations are no-ops; UI remains functional.
 */
import React, { useMemo, useRef } from 'react';
import { View, type ViewProps } from 'react-native';

function stubLayout() {
  const api = {
    duration: () => api,
    easing: () => api,
    withInitialValues: () => api,
  };
  return api;
}

export const Easing = {
  out: (fn: () => number) => fn,
  in: (fn: () => number) => fn,
  cubic: () => 0,
};

export const FadeInDown = stubLayout();
export const FadeOut = stubLayout();
export const SlideInLeft = stubLayout();
export const SlideInRight = stubLayout();
export const FadeIn = stubLayout();

function LayoutView({ entering, exiting, ...rest }: ViewProps & { entering?: unknown; exiting?: unknown }) {
  return <View {...rest} />;
}

export function useSharedValue<T>(init: T) {
  return useRef({ value: init }).current as { value: T };
}

export function useAnimatedStyle<T extends object>(updater: () => T) {
  return useMemo(updater, []);
}

export function withTiming<T>(toValue: T, _config?: object) {
  return toValue;
}

const Animated = {
  View: LayoutView,
  createAnimatedComponent: <P extends object>(C: React.ComponentType<P>) => C,
};

export default Animated;
