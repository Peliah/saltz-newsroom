import { Pressable, Text, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type PersonalizeFooterProps = {
  onSkip: () => void;
  onSave: () => void;
};

export function PersonalizeFooter({ onSkip, onSave }: PersonalizeFooterProps) {
  return (
    <View style={styles.footerBar}>
      <Pressable onPress={onSkip}>
        <Text style={styles.skipText}>Skip for now</Text>
      </Pressable>
      <Pressable style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveBtnText}>Save preferences</Text>
      </Pressable>
    </View>
  );
}
