import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { df } from '@/constants/typography';

export function LoadingBlock() {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color="#EE343B" />
      <Text style={styles.caption}>Loading…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  caption: {
    fontSize: df(14),
    color: '#9498A2',
    fontFamily: 'InterRegular',
  },
});
