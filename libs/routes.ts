export const routes = {
  auth: {
    signIn: '/(auth)/sigin-in',
    signUp: '/(auth)/sigin-up',
    forgotPassword: '/(auth)/forgot-password',
  },
  tabs: {
    home: '/(tabs)',
    events: '/(tabs)/events',
    search: '/(tabs)/search',
    saved: '/(tabs)/saved',
  },
} as const;
