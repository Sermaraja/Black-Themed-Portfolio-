export class ChatConstants {
  static readonly SUGGESTED_QUESTIONS = [
    "Tell me about yourself",
    "What are your top technical skills?",
    "Show your cloud & DevOps projects",
    "Tell me about your Azure experience",
    "What certifications do you hold?",
    "Show your awards and recognitions",
    "What services do you offer?",
    "How can I contact Sermaraja?"
  ];

  static readonly ALLOWED_TOPICS = [
    "about", "bio", "background", "skills", "technologies", "tech stack",
    "projects", "work", "experience", "employment", "career", "job",
    "certifications", "certificates", "awards", "recognitions", "honors",
    "contributions", "open source", "blogs", "articles", "documentation",
    "education", "degree", "services", "consulting", "internship",
    "resume", "cv", "testimonials", "achievements", "contact", "email",
    "portfolio", "github", "linkedin", "devopstrio"
  ];

  static readonly BLOCKED_TOPICS_KEYWORDS = [
    "recipe", "cooking", "movie", "film", "cinema", "actor", "actress",
    "sports", "football", "cricket", "basketball", "politics", "election",
    "president", "minister", "news", "weather", "forecast", "stock market",
    "crypto", "bitcoin", "medical", "disease", "doctor", "medicine",
    "legal", "lawsuit", "lawyer", "general programming code for unrelated project",
    "write python script for snake game", "who won the world cup"
  ];

  static readonly UNKNOWN_RESPONSE = 
    "I couldn't find that specific information in Sermaraja's portfolio. Please try asking about his projects, certifications, cloud experience, services, awards, recognitions, or contact information!";

  static readonly BLOCKED_RESPONSE = 
    "I'm the AI assistant for Sermaraja's portfolio and can answer only questions related to his background, projects, certifications, experience, services, and content available on this website.";
}
