import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppChromeHeader } from '@/components/ui/app-headers';
import { articleStyles } from '@/stylesheet/article.styles';


export function ArticleNavHeader() {
  const insets = useSafeAreaInsets();

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
      <AppChromeHeader />
    </View>
  );
}
