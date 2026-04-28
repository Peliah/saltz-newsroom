import { Plus } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type CustomTopicRowProps = {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
};

export function CustomTopicRow({ value, onChangeText, onAdd }: CustomTopicRowProps) {
  return (
    <View style={styles.addRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        placeholder="Add your own (e.g. SaaS, Yoga, Anime)"
        placeholderTextColor="#9498A2"
        style={styles.addInput}
      />
      <Pressable style={styles.addBtn} onPress={onAdd}>
        <Plus size={16} color="#F0F2F5" strokeWidth={1.75} />
      </Pressable>
    </View>
  );
}
