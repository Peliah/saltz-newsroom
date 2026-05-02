import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#F0F2F5',
    background: '#0C0D0F',
    tint: '#EE343B',
    icon: '#9498A2',
    tabIconDefault: '#9498A2',
    tabIconSelected: '#EE343B',
    surface: '#131417',
    mutedText: '#9498A2',
    danger: '#EE343B',
  },
  dark: {
    text: '#F0F2F5',
    background: '#0C0D0F',
    tint: '#EE343B',
    icon: '#9498A2',
    tabIconDefault: '#9498A2',
    tabIconSelected: '#EE343B',
    surface: '#131417',
    mutedText: '#9498A2',
    danger: '#EE343B',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'InterRegular',
    sansBold: 'InterBold',
    serif: 'GeorgiaRegular',
    serifBold: 'GeorgiaBold',
    rounded: 'InterRegular',
    mono: 'JetBrainsMono',
  },
  macos: {
    sans: 'InterRegular',
    sansBold: 'InterBold',
    serif: 'GeorgiaRegular',
    serifBold: 'GeorgiaBold',
    rounded: 'InterRegular',
    mono: 'JetBrainsMono',
  },
  default: {
    sans: 'InterRegular',
    sansBold: 'InterBold',
    serif: 'GeorgiaRegular',
    serifBold: 'GeorgiaBold',
    rounded: 'InterRegular',
    mono: 'JetBrainsMono',
  },
  web: {
    sans: 'InterRegular',
    sansBold: 'InterBold',
    serif: 'GeorgiaRegular',
    serifBold: 'GeorgiaBold',
    rounded: 'InterRegular',
    mono: 'JetBrainsMono',
  },
});

const baseDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    card: Colors.dark.surface,
    text: Colors.dark.text,
    border: Colors.dark.surface,
    notification: Colors.dark.danger,
  },
} satisfies Theme;

const baseLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.tint,
    background: Colors.light.background,
    card: Colors.light.surface,
    text: Colors.light.text,
    border: Colors.light.surface,
    notification: Colors.light.danger,
  },
} satisfies Theme;

export const AppNavigationTheme = {
  dark: baseDarkTheme,
  light: baseLightTheme,
} as const;
