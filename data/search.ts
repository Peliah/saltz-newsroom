import type { FeedItem } from '@/types/feed';

export const mockSearchArticles: FeedItem[] = [
  {
    id: 's1',
    articleUrl: 'https://example.com/search/s1',
    title: 'What £200 buys in Birmingham property market vs UK’s most expensive areas',
    description:
      'Zoopla analysis reveals the stark gap in UK property prices across Birmingham and beyond.',
    source: 'Birmingham Live',
    publishedAgo: '12 hours ago',
    imageUrl: 'https://picsum.photos/900/500?random=41',
  },
  {
    id: 's2',
    articleUrl: 'https://example.com/search/s2',
    title: 'Surrey borough ranked most expensive in the South East in staggering £200 test',
    description: 'Average costs for flat-space buying vary sharply across commuting regions.',
    source: 'Surrey Advertiser',
    publishedAgo: '12 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=42',
  },
  {
    id: 's3',
    articleUrl: 'https://example.com/search/s3',
    title: 'London house prices so high £200 only buys quarter sheet of A4',
    description: 'A playful valuation metric underlines housing pressure in capital districts.',
    source: 'My London',
    publishedAgo: '11 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=43',
  },
  {
    id: 's4',
    articleUrl: 'https://example.com/search/s4',
    title: 'Best UK areas where £200 stretches furthest in regional property tests',
    description: 'An updated snapshot of affordability in commuter towns and suburban markets.',
    source: 'Daily Mail Online',
    publishedAgo: '12 days ago',
    imageUrl: 'https://picsum.photos/900/500?random=44',
  },
];
