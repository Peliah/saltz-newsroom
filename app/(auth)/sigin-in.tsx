import { Link, router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { useAuthScreenContentPaddingTop } from '@/hooks/use-auth-header-offset';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export default function SignInScreen() {
  const contentPaddingTop = useAuthScreenContentPaddingTop();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.screen}>
      <AuthHeader variant="auth" />

      <View style={[styles.content, { paddingTop: contentPaddingTop }]}>
        <View style={styles.card}>
          <View style={styles.divider}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.body}>Welcome back to the newsroom.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput placeholder="Email" keyboardType="email-address" />
            <CustomInput placeholder="Password" secureTextEntry />
          </View>

          <Link href="/(auth)/forgot-password" style={styles.forgotPasswordRow}>
            <Text style={styles.forgotPasswordText}>
              Forgot your password? <Text style={styles.forgotPasswordTextHighlight}>Reset it</Text>
            </Text>
          </Link>

          <View style={styles.rememberRow}>
            <Pressable
              onPress={() => setRememberMe((value) => !value)}
              style={[styles.rememberBox, rememberMe && styles.rememberBoxChecked]}>
              {rememberMe ? <Check size={10} color="#F0F2F5" /> : null}
            </Pressable>
            <Text style={styles.rememberText}>Remember me pleaseeee</Text>
          </View>

          <CustomButton label="Sign In" onPress={() => router.replace('/(tabs)')} />

          <Link href="/(auth)/sigin-up" style={styles.signUpRow}>
            <Text style={styles.signUpText}>
              New here? <Text style={styles.signUpTextHighlight}>Create an account</Text>
            </Text>
          </Link>
        </View>
      </View>

      <AuthFooter />
    </View>
  );
}
