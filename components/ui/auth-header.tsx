import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_TABLET_MIN } from '@/constants/layout';
import { useResponsiveWidth } from '@/context/responsive-layout-context';
import { DesktopAppHeader, MobileAppHeader } from '@/components/ui/app-headers';
import { routes } from '@/libs/routes';
import { authStyles as styles } from '@/stylesheet/auth.styles';

type AuthHeaderProps = {
  /** Full app chrome (tabs). Auth screens: brand + link back to app. */
  variant?: 'app' | 'auth';
};

export function AuthHeader({ variant = 'app' }: AuthHeaderProps) {
  const insets = useSafeAreaInsets();
  const width = useResponsiveWidth();
  const useDesktopAppHeader = width >= HEADER_TABLET_MIN;

  if (variant === 'auth') {
    return (
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            paddingLeft: 12 + insets.left,
            paddingRight: 12 + insets.right,
          },
        ]}>
        <View style={[styles.headerMax, styles.headerInner]}>
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoN} accessibilityLabel="Newsroom">
                N
              </Text>
            </View>
            <View style={styles.brandTextWrap}>
              <Text style={styles.brandTitle}>NEWSROOM</Text>
              <Text style={styles.brandSub}>LIVE WIRE</Text>
            </View>
          </View>
          <Link href={routes.tabs.home} asChild>
            <Pressable accessibilityRole="link" style={styles.outlineHeaderButton}>
              <Text style={styles.outlineHeaderButtonText}>Continue</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          paddingLeft: Math.max(12, insets.left),
          paddingRight: Math.max(12, insets.right),
        },
      ]}>
      {useDesktopAppHeader ? <DesktopAppHeader /> : <MobileAppHeader />}
    </View>
  );
}
