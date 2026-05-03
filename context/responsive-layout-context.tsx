import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, View } from 'react-native';

type ResponsiveLayoutValue = {
  width: number;
  height: number;
};

const ResponsiveLayoutContext = createContext<ResponsiveLayoutValue | null>(null);

/**
 * Measures the root content size with `onLayout` so width/height update when the window is resized.
 * `useWindowDimensions()` does not reliably update on resize for react-native-macos desktop windows.
 */
export function ResponsiveLayoutProvider({ children }: { children: ReactNode }) {
  const [size, setSize] = useState<ResponsiveLayoutValue>(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    }
  }, []);

  return (
    <ResponsiveLayoutContext.Provider value={size}>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {children}
      </View>
    </ResponsiveLayoutContext.Provider>
  );
}

/** Width from root layout measurement — updates on desktop window resize (including macOS). */
export function useResponsiveWidth(): number {
  const ctx = useContext(ResponsiveLayoutContext);
  if (ctx) {
    return ctx.width;
  }
  return Dimensions.get('window').width;
}
