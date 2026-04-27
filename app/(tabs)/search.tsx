import { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { authStyles } from '@/stylesheet/auth.styles';
import { listingStyles as styles } from '@/stylesheet/listing.styles';

const articles = [
  'Global Economy Outlook 2026',
  'How Local Newsrooms Use AI',
  'City Council Announces New Transport Plan',
  'Inside The Weekend Sports Roundup',
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => articles.filter((article) => article.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search stories..."
        style={authStyles.input}
      />

      {filtered.map((article) => (
        <View key={article} style={styles.item}>
          <Text style={styles.body}>{article}</Text>
        </View>
      ))}
    </View>
  );
}
