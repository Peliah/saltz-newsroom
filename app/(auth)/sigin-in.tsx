import { Link, router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { authStyles as styles } from '@/stylesheet/auth.styles';

export default function SignInScreen() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.screen}>
      <AuthHeader />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.divider}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.body}>Welcome back to the newsroom.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput placeholder="Email" keyboardType="email-address" />
            <CustomInput placeholder="Password" secureTextEntry />
          </View>

          <View style={styles.rememberRow}>
            <Pressable
              onPress={() => setRememberMe((value) => !value)}
              style={[styles.rememberBox, rememberMe && styles.rememberBoxChecked]}>
              {rememberMe ? <Check size={10} color="#F0F2F5" /> : null}
            </Pressable>
            <Text style={styles.rememberText}>Remember me pleaseeee</Text>
          </View>

          <CustomButton label="Sign In" onPress={() => router.replace('/(tabs)')} />

          <Text style={styles.helper}>Account links:</Text>
          <View style={styles.helperLinksRow}>
            <Link href="/(auth)/sigin-up">
              <Text style={styles.link}>Sign Up</Text>
            </Link>
            <Link href="/(auth)/forgot-password">
              <Text style={styles.link}>Forgot password</Text>
            </Link>
          </View>
        </View>
      </View>

      <AuthFooter />
    </View>
  );
}
