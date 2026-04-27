import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { useAuthScreenContentPaddingTop } from '@/hooks/use-auth-header-offset';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export default function SignUpScreen() {
  const contentPaddingTop = useAuthScreenContentPaddingTop();

  return (
    <View style={styles.screen}>
      <AuthHeader />

      <View style={[styles.content, { paddingTop: contentPaddingTop }]}>
        <View style={styles.card}>
          <View style={styles.divider}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.body}>Set up your profile to continue to the newsroom.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput placeholder="Full name" />
            <CustomInput placeholder="Email" keyboardType="email-address" />
            <CustomInput placeholder="Password" secureTextEntry />
            <CustomInput placeholder="Confirm password" secureTextEntry />
          </View>

          <CustomButton label="Create Account" onPress={() => router.replace('/(tabs)')} />

          <Link href="/(auth)/sigin-in" style={styles.signUpRow}>
            <Text style={styles.signUpText}>
              Already have an account? <Text style={styles.signUpTextHighlight}>Sign in</Text>
            </Text>
          </Link>
        </View>
      </View>

      <AuthFooter />
    </View>
  );
}
