import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
};

export function SectionHeading({ icon, title }: SectionHeadingProps) {
  return (
    <View style={styles.sectionHeadingRow}>
      {icon}
      <Text style={styles.sectionHeading}>{title}</Text>
    </View>
  );
}
