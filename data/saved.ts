import type { FeedItem } from '@/types/feed';

export const mockSavedStories: FeedItem[] = [
  {
    id: 'sv1',
    title: 'DJI Launches Beginner-Friendly Camera Drone Series with Lito X1 and Lito 1',
    description: 'Creators now have an accessible option for filming high-quality aerial footage.',
    source: 'The Manila Times',
    publishedAgo: 'about 14 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=101',
  },
  {
    id: 'sv2',
    title: 'This ultra-compact and powerful Anker charger has dropped to its best price of the year',
    description: 'Two USB-C ports and 47W of power.',
    source: 'Android Police',
    publishedAgo: 'about 14 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=102',
  },
];
