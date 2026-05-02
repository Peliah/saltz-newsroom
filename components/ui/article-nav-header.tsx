import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_TABLET_MIN } from '@/constants/layout';
import { useResponsiveWidth } from '@/context/responsive-layout-context';
import { DesktopAppHeader, MobileAppHeader } from '@/components/ui/app-headers';
import { articleStyles } from '@/stylesheet/article.styles';

/**
 * Article modal/screen: `DesktopAppHeader` or `MobileAppHeader` to match tab layout, in-flow (not `AuthHeader`).
 */
export function ArticleNavHeader() {
  const insets = useSafeAreaInsets();
  const width = useResponsiveWidth();
  const useDesktopAppHeader = width >= HEADER_TABLET_MIN;

  return (
    <View
      style={[
        articleStyles.articleHeaderStrip,
        {
          paddingTop: insets.top,
          paddingLeft: Math.max(12, insets.left),
          paddingRight: Math.max(12, insets.right),
          paddingBottom: 10,
        },
      ]}>
      {useDesktopAppHeader ? <DesktopAppHeader /> : <MobileAppHeader />}
    </View>
  );
}
