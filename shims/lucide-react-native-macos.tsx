/**
 * macOS: `react-native-svg` is not usable in this app build.
 * Metro resolves `lucide-react-native` here when `platform === 'macos'`.
 *
 * Renders Material Icons via the same glyph map as `@expo/vector-icons/MaterialIcons`.
 * On iOS, Expo swizzles `fontFamily: 'material'` to the real name; on macOS that
 * swizzle is disabled, so we must use the TTF’s PostScript name: `MaterialIcons-Regular`.
 */
import glyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';
import React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';

export type LucideMacProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  style?: StyleProp<TextStyle>;
};

type MaterialGlyphName = keyof typeof glyphMap;

function createLucideMac(materialName: MaterialGlyphName, displayName: string) {
  const C = React.forwardRef<Text, LucideMacProps>(function LucideMacGlyph(props, ref) {
    const { size = 24, color = '#F0F2F5', style } = props;
    const c = typeof color === 'string' ? color : '#F0F2F5';
    const code = glyphMap[materialName];
    const glyph =
      typeof code === 'number' ? String.fromCodePoint(code) : '\uFFFD';

    if (__DEV__ && typeof code !== 'number') {
      console.warn(`[lucide-macos] Missing Material glyph "${String(materialName)}" for ${displayName}`);
    }

    return (
      <Text
        ref={ref}
        selectable={false}
        allowFontScaling={false}
        accessibilityRole="image"
        style={[
          { fontSize: size, color: c },
          style,
          {
            fontFamily: 'MaterialIcons-Regular',
            fontWeight: 'normal' as const,
            fontStyle: 'normal' as const,
          },
        ]}
      >
        {glyph}
      </Text>
    );
  });
  C.displayName = displayName;
  return C;
}

export const AlertTriangle = createLucideMac('warning', 'AlertTriangle');
export const ArrowLeft = createLucideMac('arrow-back', 'ArrowLeft');
export const ArrowRight = createLucideMac('arrow-forward', 'ArrowRight');
export const Bell = createLucideMac('notifications', 'Bell');
export const Bookmark = createLucideMac('bookmark', 'Bookmark');
export const Bot = createLucideMac('smart-toy', 'Bot');
export const BookOpen = createLucideMac('menu-book', 'BookOpen');
export const CalendarClock = createLucideMac('event-available', 'CalendarClock');
export const CalendarDays = createLucideMac('calendar-today', 'CalendarDays');
export const CalendarX2 = createLucideMac('event-busy', 'CalendarX2');
export const Check = createLucideMac('check', 'Check');
export const ChevronDown = createLucideMac('expand-more', 'ChevronDown');
export const ChevronUp = createLucideMac('expand-less', 'ChevronUp');
export const Clock3 = createLucideMac('schedule', 'Clock3');
export const LogIn = createLucideMac('login', 'LogIn');
export const LogOut = createLucideMac('logout', 'LogOut');
export const MapPin = createLucideMac('place', 'MapPin');
export const MessageCircle = createLucideMac('chat-bubble-outline', 'MessageCircle');
export const Newspaper = createLucideMac('newspaper', 'Newspaper');
export const Plus = createLucideMac('add', 'Plus');
export const Search = createLucideMac('search', 'Search');
export const Share2 = createLucideMac('share', 'Share2');
export const Shield = createLucideMac('shield', 'Shield');
export const SlidersHorizontal = createLucideMac('tune', 'SlidersHorizontal');
export const Sparkles = createLucideMac('auto-awesome', 'Sparkles');
export const Tag = createLucideMac('label', 'Tag');
export const ThumbsDown = createLucideMac('thumb-down', 'ThumbsDown');
export const ThumbsUp = createLucideMac('thumb-up', 'ThumbsUp');
export const WifiOff = createLucideMac('wifi-off', 'WifiOff');
export const X = createLucideMac('close', 'X');
