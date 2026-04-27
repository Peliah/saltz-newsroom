
export type NewsApiArticle = {
  source?: { id?: string | null; name?: string | null };
  author?: string | null;
  title: string | null;
  description?: string | null;
  url?: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
};

export type NewsApiListResponse = {
  status: string;
  totalResults?: number;
  articles?: NewsApiArticle[];
  code?: string;
  message?: string;
};

export type NewsApiHeadlineCategory =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type TopHeadlinesParams = {
  country: string;
  category?: NewsApiHeadlineCategory;
  pageSize: number;
};
