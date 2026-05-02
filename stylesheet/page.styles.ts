import { StyleSheet } from 'react-native';

import { PAGE_MAX_WIDTH } from '@/constants/layout';

/** Merge into `ScrollView` `contentContainerStyle` so `pageInner` centers horizontally. */
export const pageWidthStyles = StyleSheet.create({
  scrollContentCentered: {
    alignItems: 'center',
    width: '100%',
  },
  inner: {
    width: '100%',
    maxWidth: PAGE_MAX_WIDTH,
  },
});
