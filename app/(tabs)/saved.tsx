import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { FeedGridCard } from '@/components/feed/feed-grid-card';
import type { FeedItem } from '@/components/feed/featured-feed-card';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import { savedStyles } from '@/stylesheet/saved.styles';

const savedStories: FeedItem[] = [
  {
    id: 'sv1',
    title: 'DJI Launches Beginner-Friendly Camera Drone Series with Lito X1 and Lito 1',
    description: 'Creators now have an accessible option for filming high-quality aerial footage.',
    source: 'The Manila Times',
    publishedAgo: 'about 14 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=101',
  },
  {
    id: 'sv2',
    title: 'This ultra-compact and powerful Anker charger has dropped to its best price of the year',
    description: 'Two USB-C ports and 47W of power.',
    source: 'Android Police',
    publishedAgo: 'about 14 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=102',
  },
];

export default function SavedScreen() {
  const stories = useMemo(() => savedStories, []);

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView style={savedStyles.body} contentContainerStyle={savedStyles.content}>
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
