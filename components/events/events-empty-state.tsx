import { CalendarX2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { eventsStyles as styles } from '@/stylesheet/events.styles';

type EventsEmptyStateProps = {
  onTryAgain: () => void;
};

export function EventsEmptyState({ onTryAgain }: EventsEmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <CalendarX2 size={28} color="#9498A2" strokeWidth={1.5} />
      <Text style={styles.emptyTitle}>No events match your filters</Text>
      <Text style={styles.emptyText}>
        We could not find any tech events in Lagos. Try widening your filters or choosing another
        city.
      </Text>
      <Pressable style={styles.tryAgainButton} onPress={onTryAgain}>
        <Text style={styles.tryAgainText}>Try again</Text>
      </Pressable>
    </View>
  );
}
