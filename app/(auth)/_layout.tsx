import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sigin-in" />
      <Stack.Screen name="sigin-up" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
