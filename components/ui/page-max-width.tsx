import { View, type ViewProps } from 'react-native';

import { pageWidthStyles } from '@/stylesheet/page.styles';

/** Constrains children to `PAGE_MAX_WIDTH` and centers when the viewport is wider. */
export function PageMaxWidth({ style, ...props }: ViewProps) {
  return <View style={[pageWidthStyles.inner, style]} {...props} />;
}
