import { Image } from 'expo-image';
import { Bookmark, Clock3 } from 'lucide-react-native';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useSubtlePressScale } from '@/hooks/use-subtle-press';
import { toArticleRouteParams } from '@/libs/article-route';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

import type { FeedItem } from '@/types/feed';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FeedGridCardProps = {
  item: FeedItem;
  fullWidth?: boolean;
  saved?: boolean;
  onSavePress?: () => void;
  onPress?: () => void;
};

function SaveButton({
  saved,
  onPress,
}: {
  saved: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useSubtlePressScale();
  return (
    <AnimatedPressable
      style={[styles.gridSaveButton, animatedStyle]}
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

export function FeedGridCard({
  item,
  fullWidth = false,
  saved = false,
  onSavePress,
  onPress,
}: FeedGridCardProps) {
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
      style={[styles.gridCard, fullWidth && styles.fullWidthCard]}
      onPress={openDetails}
      accessibilityLabel={`Open article: ${item.title}`}>
      <View style={styles.gridImageWrap}>
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.gridImage, fullWidth && styles.fullWidthImage]}
          contentFit="cover"
        />
        {onSavePress ? <SaveButton saved={saved} onPress={onSavePress} /> : null}
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
    </Pressable>
  );
}
