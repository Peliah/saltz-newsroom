import type { FeedItem } from '@/types/feed';

export type ArticleRouteParams = {
  id: string;
  payload: string;
};

export function toArticleRouteParams(item: FeedItem): ArticleRouteParams {
  return {
    id: item.id,
    payload: encodeURIComponent(JSON.stringify(item)),
  };
}

export function parseArticlePayload(payload: string | string[] | undefined): FeedItem | null {
  if (!payload) return null;
  const value = Array.isArray(payload) ? payload[0] : payload;
  try {
    return JSON.parse(decodeURIComponent(value)) as FeedItem;
  } catch {
    return null;
  }
}
