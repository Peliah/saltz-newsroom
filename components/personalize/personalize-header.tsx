import { Sparkles, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type PersonalizeHeaderProps = {
  onClose: () => void;
};

export function PersonalizeHeader({ onClose }: PersonalizeHeaderProps) {
  return (
    <View style={styles.headerBar}>
      <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={12}>
        <X size={18} color="#F0F2F5" strokeWidth={1.5} />
      </Pressable>
      <View style={styles.headerRow}>
        <Sparkles size={12} color="#EE343B" strokeWidth={1.75} />
        <Text style={styles.headerLabel}>Personalize</Text>
      </View>
      <Text style={styles.title}>Make this newsroom yours</Text>
      <Text style={styles.subtitle}>
        Pick your interests and we&apos;ll tailor the feed. Skip anytime — you can reopen this from the
        footer.
      </Text>
    </View>
  );
}
