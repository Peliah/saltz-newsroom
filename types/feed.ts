export type FeedItem = {
  id: string;
  /** Original article URL (empty for some fixtures). */
  articleUrl: string;
  title: string;
  description: string;
  source: string;
  publishedAgo: string;
  /** ISO 8601 from News API when available — used for “Published …” on article screen. */
  publishedAtIso?: string;
  imageUrl: string;
  categoryTag?: string;
  labelTag?: string;
};

export type FeedNavDirection = 'forward' | 'back' | 'initial';

export type FeedNavState = {
  category: string;
  dir: FeedNavDirection;
};
