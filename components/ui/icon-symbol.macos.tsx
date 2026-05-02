// Same mapping as `icon-symbol.tsx`; RN-macOS does not apply Expo’s `material` font alias
// (see expo-font `FontFamilyAliasManager`), so we render glyphs with the real PostScript name.

import glyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';
import type { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, Text, type StyleProp, type TextStyle } from 'react-native';

/** Keep in sync with `icon-symbol.tsx` MAPPING. */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const key = MAPPING[name] as keyof typeof glyphMap;
  const code = glyphMap[key];
  const glyph = typeof code === 'number' ? String.fromCodePoint(code) : '\uFFFD';

  return (
    <Text
      selectable={false}
      allowFontScaling={false}
      accessibilityRole="image"
      style={[
        { fontSize: size, color: color as string },
        style,
        {
          fontFamily: 'MaterialIcons-Regular',
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      ]}
    >
      {glyph}
    </Text>
  );
}
