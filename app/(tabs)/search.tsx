import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Platform, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';

import { FeedGridCard } from '@/components/feed/feed-grid-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { PageMaxWidth } from '@/components/ui/page-max-width';
import { LoadingBlock } from '@/components/ui/loading-block';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { StateMessage } from '@/components/ui/state-message';
import { useSavedArticles } from '@/context/saved-articles-context';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { fetchSearch } from '@/libs/news/client';
import { normalizeQuery, searchKey } from '@/libs/news/query-keys';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { pageWidthStyles } from '@/stylesheet/page.styles';
import { searchStyles } from '@/stylesheet/search.styles';

const MIN_QUERY_LEN = 2;

export default function SearchScreen() {
  const headerOffset = useAuthHeaderOffset();
  const { isSaved, toggleSaved } = useSavedArticles();
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query, 400);
  const normalized = useMemo(() => normalizeQuery(debounced), [debounced]);
  const canSearch = normalized.length >= MIN_QUERY_LEN;

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: searchKey(normalized),
    queryFn: () => fetchSearch(normalized),
    enabled: canSearch,
  });

  const results = data ?? [];
  const resultsLabel = !canSearch
    ? 'Type at least 2 characters to search'
    : `${results.length} results for "${debounced.trim() || '…'}"`;

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={[searchStyles.body, { paddingTop: headerOffset }]}
        contentContainerStyle={[searchStyles.content, pageWidthStyles.scrollContentCentered]}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => void refetch()}
            enabled={canSearch}
            tintColor="#EE343B"
            colors={Platform.OS === 'android' ? ['#EE343B'] : undefined}
          />
        }>
        <PageMaxWidth>
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
          <Text style={searchStyles.resultsCount}>{resultsLabel}</Text>
        </View>

        {!canSearch ? null : isPending ? (
          <LoadingBlock />
        ) : isError ? (
          <StateMessage title="Search failed" error={error} onRetry={() => void refetch()} />
        ) : results.length === 0 ? (
          <View style={{ paddingHorizontal: 8, marginBottom: 16 }}>
            <View style={styles.emptyStateCard}>
              <Text style={styles.emptyStateTitle}>No matches</Text>
              <Text style={styles.emptyStateDescription}>
                Try different words or a shorter phrase.
              </Text>
            </View>
          </View>
        ) : (
          <View style={searchStyles.listStack}>
            {results.map((item) => (
              <FeedGridCard
                key={item.id}
                item={item}
                fullWidth
                saved={isSaved(item.id)}
                onSavePress={() => void toggleSaved(item)}
              />
            ))}
          </View>
        )}

        <AuthFooter />
        </PageMaxWidth>
      </ScrollView>
    </View>
  );
}
