import NetInfo from '@react-native-community/netinfo';
import { WifiOff } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { df } from '@/constants/typography';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const closedRef = useRef(false);

  useEffect(() => {
    closedRef.current = false;

    void NetInfo.fetch().then((state) => {
      if (closedRef.current) return;
      setIsOnline(state.isConnected ?? true);
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (closedRef.current) return;
      setIsOnline(state.isConnected ?? true);
    });

    return () => {
      closedRef.current = true;
      unsubscribe();
    };
  }, []);

  if (isOnline) return null;

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
