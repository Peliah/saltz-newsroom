import type { Article } from '@/types/news-api';
import type { FeedItem } from '@/types/feed';

const PLACEHOLDER = 'https://picsum.photos/seed/newsroom/500/320';

function formatAgo(iso: string | null | undefined): string {
  if (!iso) return 'recently';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return 'recently';
  const diff = Math.max(0, Date.now() - t);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function idFor(article: Article, index: number): string {
  if (article.url && article.url.length > 0) return article.url;
  const title = article.title ?? '';
  const at = article.publishedAt ?? '';
  return `idx:${index}:${title.slice(0, 40)}:${at}`;
}

export function toFeedItem(
  article: Article,
  index: number,
  options: { categoryTag?: string; labelTag?: string }
): FeedItem {
  const title = article.title?.trim() || 'Untitled';
  const rawDesc = article.description?.trim() || article.content?.trim() || '';
  const description =
    rawDesc.length > 220 ? `${rawDesc.slice(0, 217).trimEnd()}…` : rawDesc || 'No description';
  const source = article.source?.name?.trim() || 'Unknown source';
  const imageUrl = article.urlToImage?.trim() || PLACEHOLDER;

  const articleUrl = article.url?.trim() ?? '';

  return {
    id: idFor(article, index),
    articleUrl,
    title,
    description,
    source,
    publishedAgo: formatAgo(article.publishedAt ?? undefined),
    imageUrl,
    categoryTag: options.categoryTag,
    labelTag: options.labelTag,
  };
}
