import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Certificate } from '@/models/Certificate';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ certId: string }> }
) {
  try {
    await connectToDatabase();
    const { certId } = await params;
    const cert = await Certificate.findOneAndUpdate(
      { id: certId },
      { status: 'verified' },
      { new: true }
    );
    if (!cert) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Certificate approved successfully', certificate: cert });
  } catch (error: any) {
    console.error('Approve Certificate API Error:', error);
    return NextResponse.json({ error: 'Failed to approve certificate' }, { status: 500 });
  }
}
