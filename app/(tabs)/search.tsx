import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { FeedGridCard } from '@/components/feed/feed-grid-card';
import type { FeedItem } from '@/components/feed/featured-feed-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { searchStyles } from '@/stylesheet/search.styles';

const articles: FeedItem[] = [
  {
    id: 's1',
    title: 'What £200 buys in Birmingham property market vs UK’s most expensive areas',
    description:
      'Zoopla analysis reveals the stark gap in UK property prices across Birmingham and beyond.',
    source: 'Birmingham Live',
    publishedAgo: '12 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=41',
  },
  {
    id: 's2',
    title: 'Surrey borough ranked most expensive in the South East in staggering £200 test',
    description: 'Average costs for flat-space buying vary sharply across commuting regions.',
    source: 'Surrey Advertiser',
    publishedAgo: '12 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=42',
  },
  {
    id: 's3',
    title: 'London house prices so high £200 only buys quarter sheet of A4',
    description: 'A playful valuation metric underlines housing pressure in capital districts.',
    source: 'My London',
    publishedAgo: '11 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=43',
  },
  {
    id: 's4',
    title: 'Best UK areas where £200 stretches furthest in regional property tests',
    description: 'An updated snapshot of affordability in commuter towns and suburban markets.',
    source: 'Daily Mail Online',
    publishedAgo: '12 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=44',
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      articles.filter((article) =>
        `${article.title} ${article.description} ${article.source}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView style={searchStyles.body} contentContainerStyle={searchStyles.content}>
        <View style={searchStyles.headerCard}>
          <Text style={searchStyles.kicker}>Search</Text>
          <Text style={searchStyles.title}>Find articles</Text>
          <View style={searchStyles.searchInputRow}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search stories..."
              placeholderTextColor="#9498A2"
              style={searchStyles.searchInput}
            />
          </View>
          <Text style={searchStyles.resultsCount}>
            {filtered.length} results for &quot;{query || 'all'}&quot;
          </Text>
        </View>

        <View style={searchStyles.listStack}>
          {filtered.map((item) => (
            <FeedGridCard key={item.id} item={item} fullWidth />
          ))}
        </View>

        <AuthFooter />
      </ScrollView>
    </View>
  );
}
