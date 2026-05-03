import { Platform } from 'react-native';

const DESKTOP_FONT_SCALE = 1.125;

export function isDesktopLikeTypography(): boolean {
  return Platform.OS === 'web' || Platform.OS === 'macos';
}

export function df(px: number): number {
  if (!isDesktopLikeTypography()) return px;
  return Math.round(px * DESKTOP_FONT_SCALE);
}
