import { Newspaper } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

type FeedsEmptyStateProps = {
  category: string;
};

export function FeedsEmptyState({ category }: FeedsEmptyStateProps) {
  return (
    <View style={styles.emptyStateCard}>
      <View style={styles.emptyStateIconWrap}>
        <Newspaper size={18} color="#9498A2" strokeWidth={1.75} />
      </View>
      <Text style={styles.emptyStateTitle}>No stories in {category}</Text>
      <Text style={styles.emptyStateDescription}>
        We do not have published stories for this section yet. Try another category.
      </Text>
    </View>
  );
}
