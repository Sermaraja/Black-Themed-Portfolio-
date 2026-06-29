import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { KnowledgeDocument } from '@/types/chat';

// Cache for in-memory document indexing during runtime
let cachedDocuments: KnowledgeDocument[] | null = null;

/**
 * Recursively scans a directory to find all .md files.
 */
function getMarkdownFiles(dirPath: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dirPath)) return results;

  const list = fs.readdirSync(dirPath);
  list.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * Automatically discovers and parses all markdown knowledge base files in the content/ directory.
 */
export function getAllKnowledgeDocuments(): KnowledgeDocument[] {
  if (cachedDocuments && process.env.NODE_ENV === 'production') {
    return cachedDocuments;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const filePaths = getMarkdownFiles(contentDir);

  const docs: KnowledgeDocument[] = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Compute relative category and slug if missing
    const relativePath = path.relative(contentDir, filePath);
    const pathParts = relativePath.split(path.sep);
    const inferredCategory = pathParts.length > 1 ? pathParts[0] : 'General';
    const inferredSlug = path.basename(filePath, '.md');

    // Clean up title and summary
    const title = data.title || inferredSlug.replace(/-/g, ' ');
    const summary = data.summary || content.slice(0, 180).replace(/[#*`]/g, '').trim() + '...';

    return {
      id: `${inferredCategory}-${inferredSlug}`,
      title: title,
      category: data.category || inferredCategory.charAt(0).toUpperCase() + inferredCategory.slice(1),
      slug: data.slug || inferredSlug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      content: content.trim(),
      summary: summary,
      filepath: relativePath,
      date: data.date ? String(data.date) : undefined,
      featured: Boolean(data.featured)
    };
  });

  cachedDocuments = docs;
  return docs;
}
