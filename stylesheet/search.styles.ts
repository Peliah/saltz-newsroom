import { StyleSheet } from 'react-native';
import { df } from '@/constants/typography';

export const searchStyles = StyleSheet.create({
  body: {
    paddingTop: 0,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 12,
    paddingBottom: 50,
  },
  headerCard: {
    borderWidth: 1,
    borderColor: '#27292D',
    backgroundColor: '#131417',
    padding: 12,
    gap: 8,
  },
  kicker: {
    fontSize: df(10),
    lineHeight: df(15),
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    color: '#EE343B',
    fontFamily: 'JetBrainsMono',
  },
  title: {
    fontSize: df(24),
    lineHeight: df(26),
    letterSpacing: -0.36,
    color: '#F0F2F5',
    fontFamily: 'GeorgiaBold',
  },
  searchInputRow: {
    borderWidth: 1,
    borderColor: '#EE343B',
    backgroundColor: '#0C0D0F',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    color: '#F0F2F5',
    fontSize: df(12),
    lineHeight: df(16),
    fontFamily: 'InterRegular',
  },
  resultsCount: {
    fontSize: df(10),
    lineHeight: df(15),
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    color: '#9498A2',
    fontFamily: 'JetBrainsMono',
  },
  listStack: {
    gap: 12,
  },
});
