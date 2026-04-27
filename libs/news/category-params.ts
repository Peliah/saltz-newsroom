import type { HeadlineParams } from '@/types/news-api';

const country = 'us';
const pageSize = 20;

export function paramsForCategory(tab: string): HeadlineParams {
  switch (tab) {
    case 'Top Stories':
      return { country, pageSize };
    case 'Business':
      return { country, category: 'business', pageSize };
    case 'Technology':
      return { country, category: 'technology', pageSize };
    case 'World':
      return { country, category: 'general', pageSize };
    case 'Sports':
      return { country, category: 'sports', pageSize };
    case 'Science':
      return { country, category: 'science', pageSize };
    case 'Health':
      return { country, category: 'health', pageSize };
    case 'Entertainment':
      return { country, category: 'entertainment', pageSize };
    default:
      return { country, pageSize };
  }
}
