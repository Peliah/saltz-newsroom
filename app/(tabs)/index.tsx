import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
    Easing,
    FadeInDown,
    FadeOut,
    SlideInLeft,
    SlideInRight,
} from 'react-native-reanimated';

import { CategoryTabs } from '@/components/feed/category-tabs';
import { FeaturedFeedCard } from '@/components/feed/featured-feed-card';
import { FeedGridCard } from '@/components/feed/feed-grid-card';
import { FeedsEmptyState } from '@/components/feed/feeds-empty-state';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { feedCategories, mockFeedItems } from '@/data/feed';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import type { FeedNavDirection, FeedNavState } from '@/types/feed';

export default function HomeScreen() {
  const headerOffset = useAuthHeaderOffset();
  const [feedNav, setFeedNav] = useState<FeedNavState>({
    category: 'Top Stories',
    dir: 'initial',
  });
  const activeCategory = feedNav.category;

  const selectCategory = useCallback((category: string) => {
    setFeedNav((prev) => {
      if (category === prev.category) return prev;
      const oldIdx = feedCategories.indexOf(prev.category);
      const newIdx = feedCategories.indexOf(category);
      let dir: FeedNavDirection = 'initial';
      if (newIdx > oldIdx) dir = 'forward';
      else if (newIdx < oldIdx) dir = 'back';
      return { category, dir };
    });
  }, []);

  const filteredItems = useMemo(
    () =>
      activeCategory === 'Top Stories'
        ? mockFeedItems
        : mockFeedItems.filter((item) => item.categoryTag === activeCategory),
    [activeCategory]
  );

  const featuredItem = filteredItems[0];
  const gridItems = filteredItems.slice(1);

  const feedEntering = useMemo(() => {
    const easing = Easing.out(Easing.cubic);
    const duration = 360;
    if (feedNav.dir === 'back') {
      return SlideInLeft.duration(duration).easing(easing);
    }
    if (feedNav.dir === 'forward') {
      return SlideInRight.duration(duration).easing(easing);
    }
    return FadeInDown.duration(420)
      .easing(easing)
      .withInitialValues({
        opacity: 0.92,
        transform: [{ translateY: 6 }],
      });
  }, [feedNav.dir]);

  const feedExiting = useMemo(
    () => FadeOut.duration(240).easing(Easing.in(Easing.cubic)),
    []
  );

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={[styles.content, { paddingTop: headerOffset }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <OfflineBanner />
        <CategoryTabs
          categories={feedCategories}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
        />

        <View style={styles.feedContainer}>
          <Animated.View
            key={activeCategory}
            entering={feedEntering}
            exiting={feedExiting}>
            <View style={styles.titleRow}>
              <Text style={styles.sectionText}>Section</Text>
              <Text style={styles.headingText}>{activeCategory}</Text>
            </View>

            {featuredItem ? (
              <>
                <FeaturedFeedCard item={featuredItem} />
                {gridItems.length > 0 ? (
                  <View style={styles.grid}>
                    {gridItems.map((item) => (
                      <FeedGridCard key={item.id} item={item} />
                    ))}
                  </View>
                ) : null}
              </>
            ) : (
              <FeedsEmptyState category={activeCategory} />
            )}
          </Animated.View>
        </View>

        <AuthFooter />
      </ScrollView>
    </View>
  );
}
