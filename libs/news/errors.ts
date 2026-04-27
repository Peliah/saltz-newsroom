import type { ArticleList } from '@/types/news-api';

export class NewsError extends Error {
  readonly code?: string;
  readonly statusCode: number;

  constructor(message: string, options: { code?: string; statusCode: number }) {
    super(message);
    this.name = 'NewsError';
    this.code = options.code;
    this.statusCode = options.statusCode;
  }

  static fromBody(body: ArticleList, statusCode: number): NewsError {
    const message = body.message ?? 'News request failed';
    const code = body.code;
    return new NewsError(message, { code, statusCode });
  }
}

export function isNewsError(e: unknown): e is NewsError {
  return e instanceof NewsError;
}

export function isRateLimited(e: unknown): boolean {
  if (!isNewsError(e)) return false;
  if (e.statusCode === 429) return true;
  return e.code === 'rateLimited' || e.message.toLowerCase().includes('rate');
}

export function formatError(e: unknown): string {
  if (isNewsError(e)) return e.message;
  if (e instanceof Error) return e.message;
  return 'Something went wrong';
}
