export type FeedItem = {
  id: string;
  /** Original article URL (empty for some fixtures). */
  articleUrl: string;
  title: string;
  description: string;
  source: string;
  publishedAgo: string;
  imageUrl: string;
  categoryTag?: string;
  labelTag?: string;
};

export type FeedNavDirection = 'forward' | 'back' | 'initial';

export type FeedNavState = {
  category: string;
  dir: FeedNavDirection;
};
