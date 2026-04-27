import { Pressable, ScrollView, Text, View } from 'react-native';

import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <View style={styles.categoriesBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <Pressable
              key={category}
              style={styles.categoryButton}
              onPress={() => onSelectCategory(category)}>
              <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                {category}
              </Text>
              {isActive ? <View style={styles.categoryUnderline} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
