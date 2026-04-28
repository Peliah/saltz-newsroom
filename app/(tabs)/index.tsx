import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native';
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
import { LoadingBlock } from '@/components/ui/loading-block';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { StateMessage } from '@/components/ui/state-message';
import { usePreferences } from '@/context/preferences-context';
import { feedCategories } from '@/data/feed';
import { useAuthHeaderOffset } from '@/hooks/use-auth-header-offset';
import { fetchFeed } from '@/libs/news/client';
import { feedKey } from '@/libs/news/query-keys';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';
import type { FeedNavDirection, FeedNavState } from '@/types/feed';

export default function HomeScreen() {
  const headerOffset = useAuthHeaderOffset();
  const { preferences } = usePreferences();
  const [feedNav, setFeedNav] = useState<FeedNavState>({
    category: 'Top Stories',
    dir: 'initial',
  });
  const activeCategory = feedNav.category;

  const visibleCategories = useMemo(() => {
    const e = preferences.enabledCategories;
    if (!e.length || e.length === feedCategories.length) return feedCategories;
    return feedCategories.filter((c) => e.includes(c));
  }, [preferences.enabledCategories]);

  useEffect(() => {
    setFeedNav((prev) => {
      if (visibleCategories.includes(prev.category)) return prev;
      return { category: visibleCategories[0] ?? 'Top Stories', dir: 'initial' };
    });
  }, [visibleCategories]);

  const countryCode = preferences.countryCode;

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: feedKey(activeCategory, countryCode),
    queryFn: () =>
      fetchFeed(activeCategory, countryCode ? { country: countryCode } : undefined),
  });

  const items = data ?? [];
  const featuredItem = items[0];
  const gridItems = items.slice(1);

  const selectCategory = useCallback((category: string) => {
    setFeedNav((prev) => {
      if (category === prev.category) return prev;
      const oldIdx = visibleCategories.indexOf(prev.category);
      const newIdx = visibleCategories.indexOf(category);
      let dir: FeedNavDirection = 'initial';
      if (newIdx > oldIdx) dir = 'forward';
      else if (newIdx < oldIdx) dir = 'back';
      return { category, dir };
    });
  }, [visibleCategories]);

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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => void refetch()}
            tintColor="#EE343B"
            colors={Platform.OS === 'android' ? ['#EE343B'] : undefined}
          />
        }>
        <OfflineBanner />
        <CategoryTabs
          categories={visibleCategories}
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

            {isPending ? (
              <LoadingBlock />
            ) : isError ? (
              <StateMessage error={error} onRetry={() => void refetch()} />
            ) : featuredItem ? (
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
