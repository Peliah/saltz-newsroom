import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { mockSearchArticles } from '@/data/search';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { FeedGridCard } from '@/components/feed/feed-grid-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { searchStyles } from '@/stylesheet/search.styles';

export default function SearchScreen() {
  const headerOffset = useAuthHeaderOffset();
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      mockSearchArticles.filter((article) =>
        `${article.title} ${article.description} ${article.source}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={[searchStyles.body, { paddingTop: headerOffset }]}
        contentContainerStyle={searchStyles.content}>
        <OfflineBanner />
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
