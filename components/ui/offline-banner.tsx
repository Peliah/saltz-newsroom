import { onlineManager } from '@tanstack/react-query';
import { WifiOff } from 'lucide-react-native';
import { useSyncExternalStore } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { df } from '@/constants/typography';

export function OfflineBanner() {
  const online = useSyncExternalStore(
    onlineManager.subscribe,
    () => onlineManager.isOnline(),
    () => true
  );

  if (online) return null;

  return (
    <View style={styles.wrap} accessibilityRole="alert">
      <WifiOff size={16} color="#EE343B" strokeWidth={1.75} />
      <Text style={styles.text}>
        You&apos;re offline. New stories won&apos;t load until you reconnect; anything already loaded may
        still show.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginHorizontal: 8,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#27292D',
    backgroundColor: '#131417',
  },
  text: {
    flex: 1,
    fontSize: df(12),
    lineHeight: df(17),
    fontFamily: 'InterRegular',
    color: '#C5C8CE',
  },
});
