import { paramsForCategory } from '@/libs/news/category-params';
import { NewsError } from '@/libs/news/errors';
import { toFeedItem } from '@/libs/news/map-article';
import type { FeedItem } from '@/types/feed';
import type { Article, ArticleList } from '@/types/news-api';

const APIKEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE = 'https://newsapi.org/v2';

async function request(endpoint: string, params: Record<string, string>): Promise<Article[]> {
  if (!APIKEY) {
    throw new NewsError('Missing EXPO_PUBLIC_NEWS_API_KEY in .env', { statusCode: 0 });
  }

  const url = new URL(`${BASE}/${endpoint}`);
  url.search = new URLSearchParams({ apiKey: APIKEY, ...params }).toString();

  const res = await fetch(url.toString());
  let body: ArticleList;
  try {
    body = (await res.json()) as ArticleList;
  } catch {
    throw new NewsError('Could not read News API response', { statusCode: res.status });
  }

  if (body.status === 'error' || !res.ok) {
    throw NewsError.fromBody(body, res.status);
  }

  return body.articles ?? [];
}

export async function fetchFeed(tab: string): Promise<FeedItem[]> {
  const { country, pageSize, category } = paramsForCategory(tab);
  const rows = await request('top-headlines', {
    country,
    pageSize: String(pageSize),
    ...(category ? { category } : {}),
  });

  return rows.map((article, i) =>
    toFeedItem(article, i, {
      categoryTag: tab,
      labelTag: i === 0 ? 'Featured' : undefined,
    })
  );
}

export async function fetchSearch(text: string, pageSize = 20): Promise<FeedItem[]> {
  const q = text.trim();
  if (!q) return [];

  const rows = await request('everything', {
    q,
    pageSize: String(pageSize),
    sortBy: 'publishedAt',
    language: 'en',
  });

  return rows.map((article, i) => toFeedItem(article, i, { categoryTag: 'Search' }));
}
