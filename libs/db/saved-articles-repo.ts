import type { SQLiteDatabase } from 'expo-sqlite';

import type { FeedItem } from '@/types/feed';

type SavedArticleRow = {
  id: string;
  article_url: string;
  title: string;
  description: string;
  source: string;
  published_ago: string;
  image_url: string;
  category_tag: string | null;
  label_tag: string | null;
  saved_at: number;
  published_at: string | null;
};

export async function migrateSavedArticlesSchema(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS saved_articles (
      id TEXT PRIMARY KEY NOT NULL,
      article_url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      source TEXT NOT NULL,
      published_ago TEXT NOT NULL,
      image_url TEXT NOT NULL,
      category_tag TEXT,
      label_tag TEXT,
      saved_at INTEGER NOT NULL,
      published_at TEXT
    );
  `);
  try {
    await db.execAsync(`ALTER TABLE saved_articles ADD COLUMN published_at TEXT;`);
  } catch {
    /* column already present */
  }
}

function rowToFeedItem(row: SavedArticleRow): FeedItem {
  return {
    id: row.id,
    articleUrl: row.article_url,
    title: row.title,
    description: row.description,
    source: row.source,
    publishedAgo: row.published_ago,
    imageUrl: row.image_url,
    categoryTag: row.category_tag ?? undefined,
    labelTag: row.label_tag ?? undefined,
    publishedAtIso: row.published_at ?? undefined,
  };
}

export async function listSavedArticles(db: SQLiteDatabase): Promise<FeedItem[]> {
  const rows = await db.getAllAsync<SavedArticleRow>(
    'SELECT * FROM saved_articles ORDER BY saved_at DESC'
  );
  return rows.map(rowToFeedItem);
}

export async function saveArticle(db: SQLiteDatabase, item: FeedItem): Promise<void> {
  const now = Date.now();
  await db.runAsync(
    `INSERT OR REPLACE INTO saved_articles
      (id, article_url, title, description, source, published_ago, image_url, category_tag, label_tag, saved_at, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    item.id,
    item.articleUrl,
    item.title,
    item.description,
    item.source,
    item.publishedAgo,
    item.imageUrl,
    item.categoryTag ?? null,
    item.labelTag ?? null,
    now,
    item.publishedAtIso ?? null
  );
}

export async function removeSavedArticle(db: SQLiteDatabase, id: string): Promise<void> {
  await db.runAsync('DELETE FROM saved_articles WHERE id = ?', id);
}

export async function clearSavedArticles(db: SQLiteDatabase): Promise<void> {
  await db.runAsync('DELETE FROM saved_articles');
}
