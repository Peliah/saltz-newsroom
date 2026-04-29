import { useSQLiteContext } from 'expo-sqlite';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
    clearSavedArticles,
    listSavedArticles,
    removeSavedArticle,
    saveArticle,
} from '@/libs/db/saved-articles-repo';
import type { FeedItem } from '@/types/feed';

type SavedArticlesContextValue = {
  items: FeedItem[];
  ready: boolean;
  isSaved: (id: string) => boolean;
  toggleSaved: (item: FeedItem) => Promise<void>;
  clearAll: () => Promise<void>;
};

const SavedArticlesContext = createContext<SavedArticlesContextValue | null>(null);

export function SavedArticlesProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await listSavedArticles(db);
        if (!cancelled) setItems(list);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [db]);

  const savedIds = useMemo(() => new Set(items.map((i) => i.id)), [items]);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  const toggleSaved = useCallback(
    async (item: FeedItem) => {
      if (savedIds.has(item.id)) {
        await removeSavedArticle(db, item.id);
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      } else {
        await saveArticle(db, item);
        setItems((prev) => [item, ...prev.filter((i) => i.id !== item.id)]);
      }
    },
    [db, savedIds]
  );

  const clearAll = useCallback(async () => {
    await clearSavedArticles(db);
    setItems([]);
  }, [db]);

  const value = useMemo(
    () => ({
      items,
      ready,
      isSaved,
      toggleSaved,
      clearAll,
    }),
    [items, ready, isSaved, toggleSaved, clearAll]
  );

  return (
    <SavedArticlesContext.Provider value={value}>{children}</SavedArticlesContext.Provider>
  );
}

export function useSavedArticles(): SavedArticlesContextValue {
  const ctx = useContext(SavedArticlesContext);
  if (!ctx) {
    throw new Error('useSavedArticles must be used within SQLiteProvider and SavedArticlesProvider');
  }
  return ctx;
}
