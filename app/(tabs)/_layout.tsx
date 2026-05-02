import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Tabs, withLayoutContext } from 'expo-router';
import { Bookmark, CalendarDays, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Platform, Text, View } from 'react-native';

import { HEADER_TABLET_MIN } from '@/constants/layout';
import { df } from '@/constants/typography';
import { useResponsiveWidth } from '@/context/responsive-layout-context';
import { Fonts } from '@/constants/theme';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabsLayout = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

type TabIconProps = {
  color: string;
};

type TabConfig = {
  name: 'index' | 'events' | 'search' | 'saved';
  title: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
};

const TABS: TabConfig[] = [
  { name: 'index', title: 'Feeds', Icon: Newspaper },
  { name: 'events', title: 'Events', Icon: CalendarDays },
  { name: 'search', title: 'Search', Icon: Search },
  { name: 'saved', title: 'Saved', Icon: Bookmark },
];

/** Matches `minWidth` on the custom `tabBarLabel` container so the icon centers over the label. */
const TAB_ITEM_MIN_WIDTH = 88;

const MAC_TAB_BAR_VISIBLE = {
  backgroundColor: '#0C0D0F',
  borderTopColor: '#27292D',
  borderTopWidth: 1,
  minHeight: 84,
  paddingTop: 10,
  paddingBottom: 10,
} as const;

const MAC_TAB_BAR_HIDDEN = {
  height: 0,
  minHeight: 0,
  maxHeight: 0,
  overflow: 'hidden' as const,
  opacity: 0,
  borderTopWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
};

function coerceTabColor(color: unknown): string {
  return typeof color === 'string' ? color : '#9498A2';
}

/** macOS tab icons: same Lucide SVGs as other platforms; width matches label for column alignment. */
function MacTabBarIcon({
  Icon,
  color,
}: {
  Icon: TabConfig['Icon'];
  color: unknown;
}) {
  const c = coerceTabColor(color);
  return (
    <View
      collapsable={false}
      style={{
        minWidth: TAB_ITEM_MIN_WIDTH,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {React.createElement(Icon, { size: 18, color: c, strokeWidth: 1.75 })}
    </View>
  );
}

function TabLayoutMacOS({ showBottomBar }: { showBottomBar: boolean }) {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fcfcfc',
        tabBarInactiveTintColor: '#9498A2',
        tabBarLabelPosition: 'below-icon',
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarStyle: showBottomBar ? MAC_TAB_BAR_VISIBLE : MAC_TAB_BAR_HIDDEN,
        tabBarLabel: ({ focused, color, children }) => (
          <View
            style={{
              alignItems: 'center',
              paddingTop: 2,
              paddingBottom: 10,
              borderBottomWidth: focused ? 2 : 0,
              borderBottomColor: '#EE343B',
              minWidth: TAB_ITEM_MIN_WIDTH,
            }}>
            <Text
              style={{
                color: coerceTabColor(color),
                fontFamily: Fonts?.mono ?? 'JetBrainsMono',
                fontSize: df(12),
                lineHeight: df(16),
                textTransform: 'uppercase',
              }}>
              {children}
            </Text>
          </View>
        ),
      }}>
      {TABS.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <MacTabBarIcon Icon={Icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}

function TabLayoutMaterial({ showBottomBar }: { showBottomBar: boolean }) {
  return (
    <MaterialTopTabsLayout
      tabBar={showBottomBar ? undefined : () => null}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: showBottomBar,
        animationEnabled: true,
        tabBarShowIcon: true,
        tabBarActiveTintColor: '#fcfcfc',
        tabBarInactiveTintColor: '#9498A2',
        tabBarStyle: showBottomBar ? { backgroundColor: '#0C0D0F', minHeight: 84 } : { height: 0 },
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        tabBarLabel: ({ focused, color, children }) => (
          <View
            style={{
              minWidth: TAB_ITEM_MIN_WIDTH,
              alignItems: 'center',
              paddingTop: 2,
              paddingBottom: 10,
              borderBottomWidth: focused ? 2 : 0,
              borderBottomColor: '#EE343B',
            }}>
            <Text
              style={{
                color,
                fontFamily: Fonts?.mono ?? 'JetBrainsMono',
                fontSize: df(12),
                lineHeight: df(16),
                textTransform: 'uppercase',
                ...(Platform.OS === 'android' ? { includeFontPadding: false } : null),
              }}>
              {children}
            </Text>
          </View>
        ),
      }}>
      {TABS.map(({ name, title, Icon }) => (
        <MaterialTopTabsLayout.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }: TabIconProps) => {
              const c = typeof color === 'string' ? color : '#9498A2';
              return (
                <View
                  style={{
                    minWidth: TAB_ITEM_MIN_WIDTH,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  collapsable={false}>
                  {React.createElement(Icon, { size: 18, color: c, strokeWidth: 1.75 })}
                </View>
              );
            },
          }}
        />
      ))}
    </MaterialTopTabsLayout>
  );
}

export default function TabLayout() {
  const width = useResponsiveWidth();
  const showBottomBar = width < HEADER_TABLET_MIN;

  if (Platform.OS === 'macos') {
    return <TabLayoutMacOS showBottomBar={showBottomBar} />;
  }

  return <TabLayoutMaterial showBottomBar={showBottomBar} />;
}
