import { Text, View } from 'react-native';
import { listingStyles as styles } from '@/stylesheet/listing.styles';

const savedStories = [
  { title: 'Election Night Recap', section: 'Politics' },
  { title: 'Tech IPO Watchlist', section: 'Business' },
  { title: 'Weekend Festival Guide', section: 'Culture' },
];

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved</Text>
      {savedStories.map((story) => (
        <View key={story.title} style={styles.item}>
          <Text style={styles.subtitle}>{story.title}</Text>
          <Text style={styles.body}>{story.section}</Text>
        </View>
      ))}
    </View>
  );
}
