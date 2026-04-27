import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export default function SignUpScreen() {
  return (
    <View style={styles.screen}>
      <AuthHeader />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.divider}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.body}>Set up your profile to continue to the newsroom.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput placeholder="Full name" />
            <CustomInput placeholder="Email" keyboardType="email-address" />
            <CustomInput placeholder="Password" secureTextEntry />
          </View>

          <CustomButton label="Create Account" onPress={() => router.replace('/(tabs)')} />

          <Link href="/(auth)/sigin-in">
            <Text style={styles.helper}>
              Already have an account? <Text style={styles.link}>Sign in</Text>
            </Text>
          </Link>
        </View>
      </View>

      <AuthFooter />
    </View>
  );
}
