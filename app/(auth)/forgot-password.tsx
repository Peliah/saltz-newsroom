import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.screen}>
      <AuthHeader />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.divider}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.body}>Enter your email to receive a reset link.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput placeholder="Email" keyboardType="email-address" />
          </View>

          <CustomButton label="Send Reset Link" />

          <Link href="/(auth)/sigin-in">
            <Text style={styles.helper}>
              Back to <Text style={styles.link}>Sign in</Text>
            </Text>
          </Link>
        </View>
      </View>

      <AuthFooter />
    </View>
  );
}
