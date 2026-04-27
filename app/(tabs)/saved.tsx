import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { mockSavedStories } from '@/data/saved';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { FeedGridCard } from '@/components/feed/feed-grid-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { savedStyles } from '@/stylesheet/saved.styles';

export default function SavedScreen() {
  const headerOffset = useAuthHeaderOffset();
  const stories = useMemo(() => mockSavedStories, []);

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={[savedStyles.body, { paddingTop: headerOffset }]}
        contentContainerStyle={savedStyles.content}>
        <View style={savedStyles.headerCard}>
          <Text style={savedStyles.kicker}>Library</Text>
          <Text style={savedStyles.title}>Saved Articles</Text>
          <Text style={savedStyles.subTitle}>{stories.length} articles saved on this device</Text>
          <Pressable style={savedStyles.clearAction}>
            <Text style={savedStyles.clearActionText}>Clear all</Text>
          </Pressable>
        </View>

        <View style={savedStyles.listStack}>
          {stories.map((item) => (
            <FeedGridCard key={item.id} item={item} fullWidth />
          ))}
        </View>

        <AuthFooter />
      </ScrollView>
    </View>
  );
}
