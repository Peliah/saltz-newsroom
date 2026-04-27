import { Bell, LogOut } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';

import { authStyles as styles } from '@/stylesheet/auth.styles';

export function AuthHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logoImage} />
          </View>
          <View style={styles.brandTextWrap}>
            <Text style={styles.brandTitle}>NEWSROOM</Text>
            <Text style={styles.brandSub}>LIVE WIRE</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Bell color="#9498A2" size={16} />
          <View style={styles.iconButton}>
            <LogOut color="#9498A2" size={12} />
          </View>
        </View>
      </View>
    </View>
  );
}
