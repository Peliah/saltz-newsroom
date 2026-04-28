import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryProvider } from '@/components/providers/query-provider';
import { PreferencesProvider } from '@/context/preferences-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(auth)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: require('@/assets/fonts/inter/InterRegular.ttf'),
    InterBold: require('@/assets/fonts/inter/InterBold.ttf'),
    GeorgiaRegular: require('@/assets/fonts/georgia/georgiaRegular.ttf'),
    GeorgiaBold: require('@/assets/fonts/georgia/georgiaBold.ttf'),
    JetBrainsMono: require('@/assets/fonts/jetbrains/JetBrainsMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <PreferencesProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </PreferencesProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
