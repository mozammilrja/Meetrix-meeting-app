// app/api/stream-token/route.ts
import { tokenProvider } from '@/actions/stream.actions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await tokenProvider();
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Token error:', error);
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
