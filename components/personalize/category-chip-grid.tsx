import { Pressable, Text, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type CategoryChipGridProps = {
  categories: readonly string[];
  selected: ReadonlySet<string>;
  onToggle: (category: string) => void;
};

export function CategoryChipGrid({ categories, selected, onToggle }: CategoryChipGridProps) {
  return (
    <View style={styles.chipWrap}>
      {categories.map((cat) => {
        const isOn = selected.has(cat);
        return (
          <Pressable
            key={cat}
            onPress={() => onToggle(cat)}
            style={[styles.chipCat, isOn && styles.chipCatSelected]}>
            <Text style={[styles.chipCatText, isOn && styles.chipCatTextSelected]}>{cat}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
