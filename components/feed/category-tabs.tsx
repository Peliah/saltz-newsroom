import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useSubtlePressScale } from '@/hooks/use-subtle-press';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function CategoryTabItem({
  category,
  isActive,
  onSelect,
}: {
  category: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useSubtlePressScale();

  return (
    <AnimatedPressable
      style={[styles.categoryButton, animatedStyle]}
      onPress={onSelect}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>{category}</Text>
      {isActive ? (
        <Animated.View entering={FadeIn.duration(200)} style={styles.categoryUnderline} />
      ) : null}
    </AnimatedPressable>
  );
}

export function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <View style={styles.categoriesBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => (
          <CategoryTabItem
            key={category}
            category={category}
            isActive={category === activeCategory}
            onSelect={() => onSelectCategory(category)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
