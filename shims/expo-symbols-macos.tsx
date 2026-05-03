/**
 * SF Symbols (`expo-symbols`) has no native view on react-native-macos in this setup.
 * Metro maps `expo-symbols` here when `platform === 'macos'`.
 * Renders `fallback` when provided; otherwise a small placeholder glyph.
 */
import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

export type SymbolViewMacProps = ViewProps & {
  name?: string;
  fallback?: React.ReactNode;
  size?: number;
  tintColor?: string;
};

export function SymbolView({ fallback, size = 24, tintColor = '#9498A2', style, ...rest }: SymbolViewMacProps) {
  if (fallback != null) {
    return <>{fallback}</>;
  }

  return (
    <View
      accessibilityRole="image"
      style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}
      {...rest}>
      <Text style={{ color: tintColor, fontSize: Math.max(10, size * 0.45), fontWeight: '600' }}>◇</Text>
    </View>
  );
}

export type {
  AnimationEffect,
  AnimationSpec,
  AnimationType,
  ContentMode,
  NativeSymbolViewProps,
  SymbolScale,
  SymbolType,
  SymbolViewProps,
  SymbolWeight,
  VariableAnimationSpec,
} from 'expo-symbols/build/SymbolModule.types';

export type { SFSymbol } from 'sf-symbols-typescript';
