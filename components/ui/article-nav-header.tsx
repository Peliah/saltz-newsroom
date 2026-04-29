import { router } from 'expo-router';
import {
  Bell,
  Bookmark,
  CalendarDays,
  LogOut,
  Newspaper,
  Search,
} from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { routes } from '@/libs/routes';
import { authStyles } from '@/stylesheet/auth.styles';
import { articleStyles } from '@/stylesheet/article.styles';

const ICON_COLOR = '#9498A2';
const ICON_SIZE = 16;

export function ArticleNavHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        articleStyles.articleHeaderStrip,
        {
          paddingTop: insets.top,
          paddingLeft: 8 + insets.left,
          paddingRight: 8 + insets.right,
          paddingBottom: 10,
        },
      ]}>
      <View style={authStyles.headerInner}>
        <View style={[authStyles.brandRow, articleStyles.articleBrandShrink]}>
          <View style={authStyles.logoBox}>
            <Image source={require('@/assets/images/logo.png')} style={authStyles.logoImage} />
          </View>
          <View style={authStyles.brandTextWrap}>
            <Text style={authStyles.brandTitle}>NEWSROOM</Text>
            <Text style={authStyles.brandSub}>LIVE WIRE</Text>
          </View>
        </View>

        <View style={articleStyles.navCluster}>
          <Pressable
            style={articleStyles.navIconHit}
            onPress={() => router.push(routes.tabs.home)}
            accessibilityLabel="Go to feeds">
            <Newspaper color={ICON_COLOR} size={ICON_SIZE} strokeWidth={1.75} />
          </Pressable>
          <Pressable
            style={articleStyles.navIconHit}
            onPress={() => router.push(routes.tabs.events)}
            accessibilityLabel="Go to events">
            <CalendarDays color={ICON_COLOR} size={ICON_SIZE} strokeWidth={1.75} />
          </Pressable>
          <Pressable
            style={articleStyles.navIconHit}
            onPress={() => router.push(routes.tabs.search)}
            accessibilityLabel="Search">
            <Search color={ICON_COLOR} size={ICON_SIZE} strokeWidth={1.75} />
          </Pressable>
          <Pressable
            style={articleStyles.navIconHit}
            onPress={() => router.push(routes.tabs.saved)}
            accessibilityLabel="Saved articles">
            <Bookmark color={ICON_COLOR} size={ICON_SIZE} strokeWidth={1.75} />
          </Pressable>
        </View>

        <View style={[authStyles.headerActions, articleStyles.articleActionsShrink]}>
          <Bell color={ICON_COLOR} size={ICON_SIZE} strokeWidth={1.75} />
          <View style={authStyles.iconButton}>
            <LogOut color={ICON_COLOR} size={12} strokeWidth={1.75} />
          </View>
        </View>
      </View>
    </View>
  );
}
