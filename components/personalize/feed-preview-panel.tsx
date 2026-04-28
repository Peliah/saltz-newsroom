import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Sparkles } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { fetchFeed } from '@/libs/news/client';
import { feedKey } from '@/libs/news/query-keys';
import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type FeedPreviewPanelProps = {
  visible: boolean;
  previewCategory: string;
  countryCode: string;
};

export function FeedPreviewPanel({ visible, previewCategory, countryCode }: FeedPreviewPanelProps) {
  const previewQuery = useQuery({
    queryKey: feedKey(previewCategory || 'Top Stories', countryCode),
    queryFn: () =>
      fetchFeed(previewCategory || 'Top Stories', {
        country: countryCode || undefined,
      }),
    enabled: visible && previewCategory !== '',
    staleTime: 60_000,
  });

  const previewItems = (previewQuery.data ?? []).slice(0, 3);

  return (
    <View style={styles.previewCard}>
      <View style={styles.previewHeader}>
        <View style={styles.previewHeaderLeft}>
          <Sparkles size={12} color="#EE343B" strokeWidth={1.75} />
          <Text style={styles.previewHeaderTitle}>Preview your feed</Text>
        </View>
        <Text style={styles.previewHeaderMeta}>Top 3</Text>
      </View>
      <View style={styles.previewHintRow}>
        <Text style={styles.previewHintAccent}>
          {previewCategory ? previewCategory.toLowerCase() : '—'}
        </Text>
        <Text style={styles.previewHint} numberOfLines={2}>
          Pick interests above to tailor this preview
        </Text>
      </View>
      <View style={styles.previewList}>
        {previewQuery.isPending ? (
          <Text style={styles.previewMuted}>Loading preview…</Text>
        ) : previewItems.length === 0 ? (
          <Text style={styles.previewMuted}>No preview yet.</Text>
        ) : (
          previewItems.map((item) => (
            <View key={item.id} style={styles.previewRow}>
              <Image source={{ uri: item.imageUrl }} style={styles.previewThumb} contentFit="cover" />
              <View style={styles.previewBody}>
                <Text style={styles.previewTitle} numberOfLines={3}>
                  {item.title}
                </Text>
                <View style={styles.previewMeta}>
                  <Text style={styles.previewSource}>{item.source}</Text>
                  <Text style={styles.previewSource}>· {item.publishedAgo}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
