import { ChatMessage } from '@/types/chat';

/**
 * Resolves context references like "it", "this", "that", "them" based on recent conversation history.
 */
export function resolveContextualQuery(currentQuery: string, history: ChatMessage[]): string {
  const normalized = currentQuery.trim();
  const pronouns = /\b(it|this|that|them|these|those)\b/i;

  // If query doesn't contain pronouns or history is empty, return as is
  if (!pronouns.test(normalized) || history.length === 0) {
    return normalized;
  }

  // Look back through previous user & assistant turns to extract major entities/topics
  const entityKeywords = [
    "azure", "aws", "terraform", "devopstrio", "collaboration champion", 
    "vmware", "docker", "kubernetes", "migration", "rhcsa", "monitoring",
    "certifications", "projects", "awards", "experience", "services"
  ];

  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    const text = msg.content.toLowerCase();
    for (const entity of entityKeywords) {
      if (text.includes(entity)) {
        // Append detected entity to enrich the fuzzy search query
        return `${normalized} (${entity})`;
      }
    }
  }

  return normalized;
}
