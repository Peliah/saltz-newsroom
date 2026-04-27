import { QueryClient } from '@tanstack/react-query';

import { isNewsError, isRateLimited } from '@/libs/news/errors';

export function createClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 30,
        retry: (count, error) => {
          if (count >= 2) return false;
          if (isRateLimited(error)) return false;
          if (isNewsError(error) && error.statusCode === 0) return false;
          return true;
        },
      },
    },
  });
}
