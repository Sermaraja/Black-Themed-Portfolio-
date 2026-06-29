export type Role = 'user' | 'assistant' | 'system';

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  slug: string;
  tags: string[];
  technologies: string[];
  content: string;
  summary?: string;
  filepath: string;
  date?: string;
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  sources?: KnowledgeDocument[];
}

export interface SearchResult {
  doc: KnowledgeDocument;
  score: number;
}

export interface ChatbotResponse {
  message: string;
  sources: KnowledgeDocument[];
  matchedTopic?: string;
  confidence: number;
}
