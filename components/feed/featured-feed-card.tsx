import { Image } from 'expo-image';
import { Bookmark, Clock3 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

export type FeedItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAgo: string;
  imageUrl: string;
  categoryTag?: string;
  labelTag?: string;
};

type FeaturedFeedCardProps = {
  item: FeedItem;
};

export function FeaturedFeedCard({ item }: FeaturedFeedCardProps) {
  return (
    <View style={styles.featuredCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.featuredImage} contentFit="cover" />
      <View style={styles.imageOverlay}>
        <View style={styles.badgeRow}>
          <View style={styles.badgePrimary}>
            <Text style={styles.badgeTextPrimary}>{item.labelTag ?? 'Featured'}</Text>
          </View>
          <View style={styles.badgeSecondary}>
            <Text style={styles.badgeTextSecondary}>{item.source}</Text>
          </View>
        </View>

        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.featuredDescription}>{item.description}</Text>
          <View style={styles.metaRow}>
            <Clock3 size={12} color="#9498A2" />
            <Text style={styles.metaText}>{item.publishedAgo}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.saveButton}>
        <Bookmark size={16} color="#F0F2F5" strokeWidth={1.5} />
      </Pressable>
    </View>
  );
}
