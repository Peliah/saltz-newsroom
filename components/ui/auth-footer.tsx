import { Sparkles } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { usePreferences } from '@/context/preferences-context';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export function AuthFooter() {
  const { openPersonalize } = usePreferences();

  return (
    <View style={styles.footerWrap}>
      <View style={styles.footerInner}>
        <View style={styles.footerTop}>
          <Text style={styles.footerCopy}>© 2026 NEWSROOM</Text>
          <Pressable style={styles.interestButton} onPress={openPersonalize}>
            <Sparkles color="#F0F2F5" size={12} />
            <Text style={styles.interestButtonText}>SELECT INTERESTS</Text>
          </Pressable>
        </View>
        <Text style={styles.poweredBy}>POWERED BY GNEWS</Text>
      </View>
    </View>
  );
}
