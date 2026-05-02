import { useCallback } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { FeedGridCard } from '@/components/feed/feed-grid-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { PageMaxWidth } from '@/components/ui/page-max-width';
import { useSavedArticles } from '@/context/saved-articles-context';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { pageWidthStyles } from '@/stylesheet/page.styles';
import { savedStyles } from '@/stylesheet/saved.styles';

export default function SavedScreen() {
  const headerOffset = useAuthHeaderOffset();
  const { items, ready, isSaved, toggleSaved, clearAll } = useSavedArticles();

  const onClearAll = useCallback(() => {
    Alert.alert('Clear saved articles?', 'This removes all articles saved on this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear all', style: 'destructive', onPress: () => void clearAll() },
    ]);
  }, [clearAll]);

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={[savedStyles.body, { paddingTop: headerOffset }]}
        contentContainerStyle={[savedStyles.content, pageWidthStyles.scrollContentCentered]}>
        <PageMaxWidth>
        <View style={savedStyles.headerCard}>
          <Text style={savedStyles.kicker}>Library</Text>
          <Text style={savedStyles.title}>Saved Articles</Text>
          <Text style={savedStyles.subTitle}>
            {ready ? `${items.length} articles saved on this device` : 'Loading your library…'}
          </Text>
          {items.length > 0 ? (
            <Pressable style={savedStyles.clearAction} onPress={onClearAll}>
              <Text style={savedStyles.clearActionText}>Clear all</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={savedStyles.listStack}>
          {items.map((item) => (
            <FeedGridCard
              key={item.id}
              item={item}
              fullWidth
              saved={isSaved(item.id)}
              onSavePress={() => void toggleSaved(item)}
            />
          ))}
        </View>

        <AuthFooter />
        </PageMaxWidth>
      </ScrollView>
    </View>
  );
}
