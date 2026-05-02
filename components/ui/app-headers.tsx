/**
 * Desktop vs mobile app headers (`DesktopAppHeader`, `MobileAppHeader`).
 */
import {
  Bell,
  Bookmark,
  CalendarDays,
  LogIn,
  Newspaper,
  Search,
  Sparkles,
} from 'lucide-react-native';
import { Link, router, useSegments } from 'expo-router';
import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { APP_HEADER_BREAKPOINT } from '@/constants/layout';
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

/**
 * Mobile app header: one row, no top tab nav (use bottom tabs) and no live clock.
 * Shown when `width < HEADER_TABLET_MIN`.
 */
export function MobileAppHeader() {
  const { openPersonalize } = usePreferences();

  return (
    <View style={styles.headerMax}>
      <View style={styles.mobileHeaderRow}>
        <View style={[styles.brandRow, styles.mobileHeaderBrand]}>
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
        <View style={styles.headerActionsEndMobile}>
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
        </View>
      </View>
    </View>
  );
}

/**
 * Desktop app header: brand, top tab nav (icon + label), interests / bell / sign-in, live clock when wide.
 * At tablet widths below `APP_HEADER_BREAKPOINT`, uses a second row + horizontal scroll for tabs.
 * Only mounted when `width >= HEADER_TABLET_MIN` (see `AuthHeader`).
 */
export function DesktopAppHeader() {
  const width = useResponsiveWidth();
  const isWideLayout = width >= APP_HEADER_BREAKPOINT;
  const { openPersonalize } = usePreferences();
  const activeTab = useHeaderActiveTabKey();

  const nav = useMemo(
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

  return (
    <View style={styles.headerMax}>
      {isWideLayout ? (
        <View style={styles.headerRowDesktop}>
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

          <View style={styles.headerNavCenter}>{nav}</View>

          <View style={styles.headerActionsEnd}>
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
            <LiveClock visible />
          </View>
        </View>
      ) : (
        <View style={styles.headerRowCompact}>
          <View style={[styles.headerInner, { width: '100%' }]}>
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
            <View style={styles.headerActionsCompact}>
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
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.headerNavScrollInner}
            style={{ maxHeight: 44 }}>
            {nav}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
