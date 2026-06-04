import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
    openRouterKeyFirstChars: process.env.OPENROUTER_API_KEY 
      ? process.env.OPENROUTER_API_KEY.substring(0, 10) + '...' 
      : 'NOT FOUND'
  });
}
