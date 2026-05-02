import { Link, router, useSegments } from 'expo-router';
import {
  Bell,
  Bookmark,
  CalendarDays,
  LogIn,
  Newspaper,
  Search,
  Sparkles,
} from 'lucide-react-native';
import { useEffect, useMemo, useState, type ComponentType } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { APP_HEADER_BREAKPOINT, HEADER_TABLET_MIN } from '@/constants/layout';
import { useResponsiveWidth } from '@/context/responsive-layout-context';
import { routes } from '@/libs/routes';
import { authStyles as styles } from '@/stylesheet/auth.styles';

import { usePreferences } from '@/context/preferences-context';

const ICON_NAV = 16;
const ICON_NAV_STROKE = 1.75;
const ICON_ACTION = 16;
const SUBTLE = '#9498A2';

export type TabKey = 'index' | 'events' | 'search' | 'saved';

export const HEADER_TAB_ITEMS: {
  key: TabKey;
  label: string;
  path: string;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}[] = [
  { key: 'index', label: 'FEED', path: routes.tabs.home, Icon: Newspaper },
  { key: 'events', label: 'EVENTS', path: routes.tabs.events, Icon: CalendarDays },
  { key: 'search', label: 'SEARCH', path: routes.tabs.search, Icon: Search },
  { key: 'saved', label: 'SAVED', path: routes.tabs.saved, Icon: Bookmark },
];

export function useHeaderActiveTabKey(): TabKey | null {
  const segments = useSegments();
  if (segments[0] !== '(tabs)') {
    return null;
  }
  const leaf = (segments[1] as string | undefined) ?? 'index';
  if (leaf === 'index' || leaf === 'events' || leaf === 'search' || leaf === 'saved') {
    return leaf;
  }
  return 'index';
}

function formatUtcOffset(d: Date): string {
  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (m === 0) {
    return `UTC${sign}${h}`;
  }
  return `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}

function LiveClock({ visible }: { visible: boolean }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!visible) {
    return null;
  }
  const time = now.toLocaleTimeString(undefined, { hour12: false });
  const offset = formatUtcOffset(now);
  return (
    <View style={styles.liveClockRow} accessibilityLabel="Local time">
      <View style={styles.liveDot} />
      <Text style={styles.liveLabel}>LIVE</Text>
      <Text style={styles.clockText}>
        {time} {offset}
      </Text>
    </View>
  );
}

function HeaderNavLink({
  label,
  path,
  active,
  Icon,
}: {
  label: string;
  path: string;
  active: boolean;
  Icon: (typeof HEADER_TAB_ITEMS)[0]['Icon'];
}) {
  return (
    <Pressable
      onPress={() => router.push(path as never)}
      accessibilityRole="link"
      accessibilityState={{ selected: active }}
      style={[styles.navTab, active && styles.navTabActive]}>
      <Icon
        size={ICON_NAV}
        color={active ? '#FCFCFC' : SUBTLE}
        strokeWidth={ICON_NAV_STROKE}
      />
      <Text style={[styles.navTabLabel, active && styles.navTabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function BrandMark({ brandRowStyle }: { brandRowStyle?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.brandRow, brandRowStyle]}>
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
  );
}

function HeaderToolbar({
  containerStyle,
  showLiveClock,
}: {
  containerStyle: StyleProp<ViewStyle>;
  showLiveClock?: boolean;
}) {
  const { openPersonalize } = usePreferences();

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={openPersonalize}
        style={styles.outlineHeaderButton}
        accessibilityLabel="Interests">
        <Sparkles color="#F0F2F5" size={14} />
        <Text style={styles.outlineHeaderButtonText}>INTERESTS</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <Bell color={SUBTLE} size={ICON_ACTION} strokeWidth={ICON_NAV_STROKE} />
      </Pressable>
      <Link href={routes.auth.signIn} asChild>
        <Pressable style={styles.outlineHeaderButton} accessibilityLabel="Sign in">
          <LogIn color="#9498A2" size={14} strokeWidth={ICON_NAV_STROKE} />
          <Text style={styles.outlineHeaderButtonText}>SIGN IN</Text>
        </Pressable>
      </Link>
      <LiveClock visible={!!showLiveClock} />
    </View>
  );
}

function useTabNav() {
  const activeTab = useHeaderActiveTabKey();
  return useMemo(
    () =>
      HEADER_TAB_ITEMS.map((t) => (
        <HeaderNavLink
          key={t.key}
          label={t.label}
          path={t.path}
          active={activeTab === t.key}
          Icon={t.Icon}
        />
      )),
    [activeTab]
  );
}

/**
 * Single app header: picks mobile vs desktop layout from width (`HEADER_TABLET_MIN`, `APP_HEADER_BREAKPOINT`).
 */
export function AppChromeHeader() {
  const width = useResponsiveWidth();
  const nav = useTabNav();

  const isTabletUp = width >= HEADER_TABLET_MIN;
  const isWideDesktopRow = width >= APP_HEADER_BREAKPOINT;

  if (!isTabletUp) {
    return (
      <View style={styles.headerMax}>
        <View style={styles.mobileHeaderRow}>
          <BrandMark brandRowStyle={styles.mobileHeaderBrand} />
          <HeaderToolbar containerStyle={styles.headerActionsEndMobile} />
        </View>
      </View>
    );
  }

  if (isWideDesktopRow) {
    return (
      <View style={styles.headerMax}>
        <View style={styles.headerRowDesktop}>
          <BrandMark />
          <View style={styles.headerNavCenter}>{nav}</View>
          <HeaderToolbar containerStyle={styles.headerActionsEnd} showLiveClock />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.headerMax}>
      <View style={styles.headerRowCompact}>
        <View style={[styles.headerInner, { width: '100%' }]}>
          <BrandMark />
          <HeaderToolbar containerStyle={styles.headerActionsCompact} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerNavScrollInner}
          style={{ maxHeight: 44 }}>
          {nav}
        </ScrollView>
      </View>
    </View>
  );
}
