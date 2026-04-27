import {
    createMaterialTopTabNavigator,
    type MaterialTopTabNavigationEventMap,
    type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Bookmark, CalendarDays, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

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

export default function TabLayout() {
  return (
    <MaterialTopTabsLayout
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarShowIcon: true,
        tabBarActiveTintColor: '#fcfcfc',
        tabBarInactiveTintColor: '#9498A2',
        tabBarStyle: { backgroundColor: '#0C0D0F', minHeight: 84 },
        tabBarItemStyle: { paddingTop: 10, paddingBottom: 10 },
        tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        tabBarLabel: ({ focused, color, children }) => (
          <View
            style={{
              minWidth: 88,
              alignItems: 'center',
              paddingBottom: 10,
              borderBottomWidth: focused ? 2 : 0,
              borderBottomColor: '#EE343B',
            }}>
            <Text style={{ color, fontSize: 12 }}>{children}</Text>
          </View>
        ),
      }}>
      {TABS.map(({ name, title, Icon }) => (
        <MaterialTopTabsLayout.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }: TabIconProps) =>
              React.createElement(Icon, { size: 18, color, strokeWidth: 1.75 }),
          }}
        />
      ))}
    </MaterialTopTabsLayout>
  );
}
