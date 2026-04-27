const root = 'news' as const;

export function feedKey(category: string) {
  return [root, 'feed', category] as const;
}

export function searchKey(query: string) {
  return [root, 'search', query] as const;
}

export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}
