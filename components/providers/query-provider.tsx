import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';

import { createClient } from '@/libs/query/query-client';

type Props = { children: ReactNode };

export function QueryProvider({ children }: Props) {
  const client = useMemo(() => createClient(), []);

  useEffect(() => {
    return onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  useEffect(() => {
    function onChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    }

    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
