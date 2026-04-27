import { Text, View } from 'react-native';
import { listingStyles as styles } from '@/stylesheet/listing.styles';

const events = [
  { title: 'Morning Briefing', time: '08:30 AM', place: 'Newsroom Studio' },
  { title: 'Editorial Sync', time: '11:00 AM', place: 'Conference Room B' },
  { title: 'Community Live Q&A', time: '05:00 PM', place: 'Online' },
];

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {events.map((event) => (
        <View key={event.title} style={styles.item}>
          <Text style={styles.subtitle}>{event.title}</Text>
          <Text style={styles.body}>{event.time}</Text>
          <Text style={styles.body}>{event.place}</Text>
        </View>
      ))}
    </View>
  );
}
