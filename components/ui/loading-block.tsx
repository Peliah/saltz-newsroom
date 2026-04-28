import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

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
    fontSize: 12,
    color: '#9498A2',
    fontFamily: 'InterRegular',
  },
});
