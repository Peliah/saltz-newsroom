/**
 * `expo-image` has no native view manager in the macOS app; use core `Image` with mapped props.
 */
import React from 'react';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
  type ImageResizeMode,
} from 'react-native';

type ContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

const contentFitToResizeMode: Record<ContentFit, ImageResizeMode> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'stretch',
  none: 'center',
  'scale-down': 'contain',
};

export type ImageProps = RNImageProps & {
  contentFit?: ContentFit;
};

export function Image({ contentFit = 'cover', style, ...rest }: ImageProps) {
  const resizeMode = contentFitToResizeMode[contentFit] ?? 'cover';
  return <RNImage style={style} resizeMode={resizeMode} {...rest} />;
}
