import { Pressable, Text, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type TopicChipGridProps = {
  topics: readonly string[];
  selected: ReadonlySet<string>;
  onToggle: (topic: string) => void;
};

export function TopicChipGrid({ topics, selected, onToggle }: TopicChipGridProps) {
  return (
    <View style={styles.chipWrap}>
      {topics.map((topic) => {
        const isOn = selected.has(topic);
        return (
          <Pressable
            key={topic}
            onPress={() => onToggle(topic)}
            style={[styles.chipTopic, isOn && styles.chipTopicSelected]}>
            <Text style={[styles.chipTopicText, isOn && styles.chipTopicTextSelected]}>{topic}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
