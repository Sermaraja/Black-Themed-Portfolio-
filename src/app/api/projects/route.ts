import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const revalidate = 60; // Cache route for 60 seconds

let cachedProjects: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 300000; // 5 minutes in milliseconds

const fallbackProjects = [
  {
    _id: "major-1",
    title: "AI-Powered Customer Support Intelligence",
    category: "major",
    label: "AI & Full Stack",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    duration: "3 Months",
    description: "Built a contextual AI chatbot platform using RAG architecture, vector search, and dynamic knowledge base indexing for real-time automated support.",
    features: [
      "Real-time streaming response engine",
      "Custom knowledge base parsing & indexing",
      "Context-aware conversation memory"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Fuse.js"],
    tags: ["AI Agent", "RAG", "Full Stack", "NLP"]
  },
  {
    _id: "freelance-1",
    title: "High-Performance E-Commerce Platform",
    category: "freelance",
    label: "E-Commerce",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    duration: "2 Months",
    description: "Architected a custom web application featuring digital product showcases, automated payment workflows, and real-time inventory management.",
    features: [
      "Sub-second page load optimization",
      "Secure payment gateway integration",
      "Responsive custom glassmorphism design"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    tags: ["Freelance", "E-Commerce", "Web App"],
    client: "Global Retail Brand"
  }
];

export async function GET() {
  const now = Date.now();

  // If cache is fresh, return HIT immediately
  if (cachedProjects && (now - lastFetchTime < CACHE_TTL)) {
    return NextResponse.json(cachedProjects, {
      headers: {
        'X-Cache': 'HIT',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  }

  // Cache is missing or expired, attempt fresh fetch
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).toArray();

    if (projects && projects.length > 0) {
      cachedProjects = projects;
      lastFetchTime = now;
      return NextResponse.json(projects, {
        headers: {
          'X-Cache': 'MISS',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      });
    }

    // If database returned 0 items, use fallback projects
    return NextResponse.json(fallbackProjects, {
      headers: {
        'X-Cache': 'STATIC_FALLBACK',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch projects fresh (using fallback):', error);

    // Serve cached or static fallback on error
    const dataToReturn = cachedProjects || fallbackProjects;
    return NextResponse.json(dataToReturn, {
      headers: {
        'X-Cache': 'FALLBACK',
        'Cache-Control': 'no-store',
      },
    });
  }
}

