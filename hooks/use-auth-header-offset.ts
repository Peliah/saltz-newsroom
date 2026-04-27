import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AUTH_HEADER_INNER_HEIGHT,
  AUTH_SCREEN_CONTENT_EXTRA_TOP,
} from '@/constants/layout';

/** Padding needed below the status bar so scroll/content clears the absolute `AuthHeader`. */
export function useAuthHeaderOffset() {
  const insets = useSafeAreaInsets();
  return AUTH_HEADER_INNER_HEIGHT + insets.top;
}

/** Auth `(auth)/` screens used ~72pt from top; keep the same gap once the header respects safe area. */
export function useAuthScreenContentPaddingTop() {
  return useAuthHeaderOffset() + AUTH_SCREEN_CONTENT_EXTRA_TOP;
}
