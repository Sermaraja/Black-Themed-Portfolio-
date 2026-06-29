import Fuse from 'fuse.js';
import { KnowledgeDocument, SearchResult } from '@/types/chat';

let fuseInstance: Fuse<KnowledgeDocument> | null = null;

/**
 * Initializes or retrieves the Fuse.js fuzzy search engine instance.
 */
export function getFuseEngine(documents: KnowledgeDocument[]): Fuse<KnowledgeDocument> {
  if (!fuseInstance || process.env.NODE_ENV !== 'production') {
    fuseInstance = new Fuse(documents, {
      keys: [
        { name: 'title', weight: 0.35 },
        { name: 'category', weight: 0.2 },
        { name: 'tags', weight: 0.15 },
        { name: 'technologies', weight: 0.15 },
        { name: 'content', weight: 0.15 }
      ],
      threshold: 0.45,
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true
    });
  }
  return fuseInstance;
}

/**
 * Performs a fuzzy search against all portfolio knowledge base documents.
 */
export function searchKnowledgeBase(query: string, documents: KnowledgeDocument[], limit: number = 5): SearchResult[] {
  if (!query.trim() || documents.length === 0) return [];

  const fuse = getFuseEngine(documents);
  const results = fuse.search(query);

  return results.slice(0, limit).map((res) => ({
    doc: res.item,
    score: res.score ?? 1
  }));
}
