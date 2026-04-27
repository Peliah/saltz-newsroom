import { StyleSheet } from 'react-native';

export const savedStyles = StyleSheet.create({
  body: {
    paddingTop: 52,
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
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    color: '#EE343B',
    fontFamily: 'JetBrainsMono',
  },
  title: {
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.36,
    color: '#F0F2F5',
    fontFamily: 'GeorgiaBold',
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#9498A2',
    fontFamily: 'InterRegular',
  },
  clearAction: {
    alignSelf: 'flex-end',
  },
  clearActionText: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    color: '#9498A2',
    fontFamily: 'JetBrainsMono',
  },
  listStack: {
    gap: 12,
  },
});
