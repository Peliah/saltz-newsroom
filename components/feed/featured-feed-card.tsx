import { Image } from 'expo-image';
import { Bookmark, Clock3 } from 'lucide-react-native';
import { router } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { FeedCardImageZoom } from '@/components/feed/feed-card-image-zoom';
import { useFeedCardHover } from '@/hooks/use-feed-card-hover';
import { useSubtlePressScale } from '@/hooks/use-subtle-press';
import { toArticleRouteParams } from '@/libs/article-route';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import type { FeedItem } from '@/types/feed';

type FeaturedFeedCardProps = {
  item: FeedItem;
  saved?: boolean;
  onSavePress?: () => void;
  onPress?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function FeaturedSaveButton({
  saved,
  onPress,
}: {
  saved: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useSubtlePressScale();
  return (
    <AnimatedPressable
      style={[styles.saveButton, animatedStyle]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      accessibilityLabel={saved ? 'Remove from saved' : 'Save article'}>
      <Bookmark size={16} color={saved ? '#EE343B' : '#F0F2F5'} strokeWidth={1.5} />
    </AnimatedPressable>
  );
}

export function FeaturedFeedCard({
  item,
  saved = false,
  onSavePress,
  onPress,
}: FeaturedFeedCardProps) {
  const { hovered, onHoverIn, onHoverOut } = useFeedCardHover();

  const openDetails = () => {
    if (onPress) {
      onPress();
      return;
    }
    router.push({
      pathname: '/article/[id]',
      params: toArticleRouteParams(item),
    });
  };

  return (
    <Pressable
      style={[
        styles.featuredCard,
        hovered && styles.featuredCardHover,
        (Platform.OS === 'web' || Platform.OS === 'macos') && { cursor: 'pointer' },
      ]}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={openDetails}
      accessibilityLabel={`Open article: ${item.title}`}>
      <View style={styles.featuredImageClip}>
        <FeedCardImageZoom hovered={hovered} hostStyle={styles.featuredImageZoomHost}>
          <Image source={{ uri: item.imageUrl }} style={styles.featuredImageFill} contentFit="cover" />
        </FeedCardImageZoom>
      </View>
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
          <Text style={[styles.featuredTitle, hovered && styles.featuredTitleHover]}>
            {item.title}
          </Text>
          <Text style={styles.featuredDescription}>{item.description}</Text>
          <View style={styles.metaRow}>
            <Clock3 size={12} color="#9498A2" />
            <Text style={styles.metaText}>{item.publishedAgo}</Text>
          </View>
        </View>
      </View>

      {onSavePress ? <FeaturedSaveButton saved={saved} onPress={onSavePress} /> : null}
    </Pressable>
  );
}
