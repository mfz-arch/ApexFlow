import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Certificate } from '@/models/Certificate';

export async function GET() {
  try {
    await connectToDatabase();
    const pendingCerts = await Certificate.find({ status: 'pending' }).sort({ createdAt: -1 });
    return NextResponse.json(pendingCerts);
  } catch (error: any) {
    console.error('Fetch Pending Certificates API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending certificates' }, { status: 500 });
  }
}
