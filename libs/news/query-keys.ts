const root = 'news' as const;

export function feedKey(category: string, countryCode = '') {
  return [root, 'feed', category, countryCode] as const;
}

export function searchKey(query: string) {
  return [root, 'search', query] as const;
}

export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}
