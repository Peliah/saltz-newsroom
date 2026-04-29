import { ArrowRight, Shield } from 'lucide-react-native';
import { Alert, Pressable, Text, View } from 'react-native';

import { articleStyles as styles } from '@/stylesheet/article.styles';

const GOLD = '#E8C547';

type SupportingEvidenceCardProps = {
  itemCount?: number;
};

export function SupportingEvidenceCard({ itemCount = 0 }: SupportingEvidenceCardProps) {
  const onSignIn = () => {
    Alert.alert('Sign in', 'Add sources, images, or notes to support this article.');
  };

  return (
    <View style={styles.evidenceCard}>
      <View style={styles.evidenceHeader}>
        <Shield size={14} color={GOLD} strokeWidth={1.75} />
        <Text style={styles.evidenceHeaderText}>
          Supporting evidence · {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <View style={styles.evidenceBody}>
        <Pressable
          onPress={onSignIn}
          style={({ pressed }) => [styles.evidenceSignInBox, pressed && styles.evidenceSignInPressed]}
          accessibilityRole="button"
          accessibilityLabel="Sign in to add supporting facts">
          <ArrowRight size={16} color="#F0F2F5" strokeWidth={1.75} />
          <Text style={styles.evidenceSignInText}>Sign in to add supporting facts</Text>
        </Pressable>
        <Text style={styles.evidencePlaceholder}>
          No evidence yet. Be the first to add a source, image, or note.
        </Text>
      </View>
    </View>
  );
}
