import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { df } from '@/constants/typography';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text style={styles.linkText}>Go to home screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: df(32),
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'GeorgiaBold',
  },
  linkText: {
    fontSize: df(16),
    color: '#2563eb',
    fontFamily: 'InterRegular',
  },
});
