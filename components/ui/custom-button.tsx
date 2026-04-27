import { Pressable, Text } from 'react-native';

import { authStyles as styles } from '@/stylesheet/auth.styles';

type CustomButtonProps = {
  label: string;
  onPress?: () => void;
};

export function CustomButton({ label, onPress }: CustomButtonProps) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}
