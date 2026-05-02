import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  APP_HEADER_BREAKPOINT,
  APP_HEADER_INNER_HEIGHT,
  APP_HEADER_INNER_HEIGHT_COMPACT,
  AUTH_SCREEN_CONTENT_EXTRA_TOP,
  HEADER_TABLET_MIN,
} from '@/constants/layout';
import { useResponsiveWidth } from '@/context/responsive-layout-context';

/**
 * Padding below the status bar so scroll/content clears the absolute `AuthHeader` (main app / tabs).
 * Height matches `MobileAppHeader` (narrow) or `DesktopAppHeader` (compact vs single row by width).
 */
export function useAuthHeaderOffset() {
  const insets = useSafeAreaInsets();
  const width = useResponsiveWidth();
  if (width < HEADER_TABLET_MIN) {
    return APP_HEADER_INNER_HEIGHT + insets.top;
  }
  const headerBody =
    width < APP_HEADER_BREAKPOINT ? APP_HEADER_INNER_HEIGHT_COMPACT : APP_HEADER_INNER_HEIGHT;
  return headerBody + insets.top;
}

/**
 * Auth route screens use `AuthHeader variant="auth"` (single row). Do not use the tab compact height.
 */
export function useAuthScreenContentPaddingTop() {
  const insets = useSafeAreaInsets();
  return APP_HEADER_INNER_HEIGHT + insets.top + AUTH_SCREEN_CONTENT_EXTRA_TOP;
}
