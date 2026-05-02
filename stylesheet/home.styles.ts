import { StyleSheet } from 'react-native';
import { df } from '@/constants/typography';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: '#f2f4f7',
  },
  title: {
    fontSize: df(32),
    color: '#111827',
    fontFamily: 'GeorgiaBold',
  },
  subtitle: {
    fontSize: df(20),
    color: '#111827',
    fontFamily: 'InterBold',
  },
  body: {
    fontSize: df(16),
    lineHeight: df(22),
    color: '#374151',
    fontFamily: 'InterRegular',
  },
  link: {
    fontSize: df(16),
    color: '#2563eb',
    fontFamily: 'InterRegular',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  action: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111827',
  },
  actionText: {
    color: '#ffffff',
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
  },
});
