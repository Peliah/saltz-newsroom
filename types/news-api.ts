export type Article = {
  source?: { id?: string | null; name?: string | null };
  author?: string | null;
  title: string | null;
  description?: string | null;
  url?: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
};

export type ArticleList = {
  status: string;
  totalResults?: number;
  articles?: Article[];
  code?: string;
  message?: string;
};

export type HeadlineCategory =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type HeadlineParams = {
  country: string;
  category?: HeadlineCategory;
  pageSize: number;
};
