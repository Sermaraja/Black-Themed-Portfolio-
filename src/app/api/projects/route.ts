import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const revalidate = 60; // Cache route for 60 seconds

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).toArray();

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
