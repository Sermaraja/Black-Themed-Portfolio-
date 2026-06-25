import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const revalidate = 60; // Cache route for 60 seconds

let cachedProjects: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 300000; // 5 minutes in milliseconds

export async function GET() {
  try {
    const now = Date.now();
    if (cachedProjects && (now - lastFetchTime < CACHE_TTL)) {
      return NextResponse.json(cachedProjects, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).toArray();

    cachedProjects = projects;
    lastFetchTime = now;

    return NextResponse.json(projects, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch projects:', error);
    // Clear cache on error so we don't cache permanent failures
    cachedProjects = null;
    lastFetchTime = 0;
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
