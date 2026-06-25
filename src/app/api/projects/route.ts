import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const revalidate = 60; // Cache route for 60 seconds

let cachedProjects: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 300000; // 5 minutes in milliseconds

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

    cachedProjects = projects;
    lastFetchTime = now;

    return NextResponse.json(projects, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch projects fresh (checking for fallback cache):', error);

    // Serve stale cache fallback if available
    if (cachedProjects) {
      console.warn('Serving stale project data from memory fallback due to database outage.');
      return NextResponse.json(cachedProjects, {
        headers: {
          'X-Cache': 'FALLBACK',
          'Cache-Control': 'no-store', // Do not cache degraded response
        },
      });
    }

    // No fallback cache available, return error response
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
