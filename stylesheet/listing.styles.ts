import { StyleSheet } from 'react-native';

export const listingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 14,
  },
  item: {
    borderRadius: 12,
    padding: 14,
    gap: 4,
    backgroundColor: '#f2f4f7',
  },
  title: {
    fontSize: 32,
    color: '#111827',
    fontFamily: 'GeorgiaBold',
  },
  subtitle: {
    fontSize: 20,
    color: '#111827',
    fontFamily: 'InterBold',
  },
  body: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'InterRegular',
  },
});
