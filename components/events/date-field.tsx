import { CalendarDays } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { eventsStyles as styles } from '@/stylesheet/events.styles';

type DateFieldProps = {
  value: string;
  placeholder: string;
  onPress: () => void;
};

export function DateField({ value, placeholder, onPress }: DateFieldProps) {
  return (
    <Pressable onPress={onPress} style={styles.dateField}>
      <Text style={styles.dateFieldLabel}>{value || placeholder}</Text>
      <View>
        <CalendarDays size={16} color="#9498A2" strokeWidth={1.75} />
      </View>
    </Pressable>
  );
}
