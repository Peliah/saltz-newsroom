import { Image } from 'expo-image';
import { Bookmark, Clock3 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

import type { FeedItem } from './featured-feed-card';

type FeedGridCardProps = {
  item: FeedItem;
};

export function FeedGridCard({ item }: FeedGridCardProps) {
  return (
    <View style={styles.gridCard}>
      <View style={styles.gridImageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.gridImage} contentFit="cover" />
        <Pressable style={styles.gridSaveButton}>
          <Bookmark size={16} color="#F0F2F5" strokeWidth={1.5} />
        </Pressable>
      </View>

      <View style={styles.gridContent}>
        <View style={styles.sourceRow}>
          <Text style={styles.sourceText} numberOfLines={1}>
            {item.source}
          </Text>
          <Text style={styles.dotText}>•</Text>
        </View>

        <View style={styles.agoRow}>
          <Clock3 size={12} color="#9498A2" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.publishedAgo}
          </Text>
        </View>

        <Text style={styles.gridTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.gridDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}
