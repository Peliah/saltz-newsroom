import type { NewsApiListResponse } from '@/types/news-api';

export class NewsApiError extends Error {
  readonly code?: string;
  readonly statusCode: number;

  constructor(message: string, options: { code?: string; statusCode: number }) {
    super(message);
    this.name = 'NewsApiError';
    this.code = options.code;
    this.statusCode = options.statusCode;
  }

  static fromResponseBody(body: NewsApiListResponse, statusCode: number): NewsApiError {
    const message = body.message ?? 'News request failed';
    const code = body.code;
    return new NewsApiError(message, { code, statusCode });
  }
}

export function isNewsApiError(e: unknown): e is NewsApiError {
  return e instanceof NewsApiError;
}

export function isRateLimited(e: unknown): boolean {
  if (!isNewsApiError(e)) return false;
  if (e.statusCode === 429) return true;
  return e.code === 'rateLimited' || e.message.toLowerCase().includes('rate');
}

export function getNewsApiUserMessage(e: unknown): string {
  if (isNewsApiError(e)) return e.message;
  if (e instanceof Error) return e.message;
  return 'Something went wrong';
}
