import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Certificate } from '@/models/Certificate';

export async function GET() {
  try {
    await connectToDatabase();
    const certs = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json(certs);
  } catch (error: any) {
    console.error('Fetch Certificates API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
