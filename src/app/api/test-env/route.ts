import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const envVars: Record<string, string> = {};
  
  Object.entries(process.env).forEach(([key, value]) => {
    if (key.startsWith('OPENROUTER') || key.startsWith('NEXT_PUBLIC') || key.startsWith('R2') || key.startsWith('UPSTASH')) {
      envVars[key] = key.includes('KEY') || key.includes('SECRET') || key.includes('TOKEN')
        ? (value ? value.substring(0, 10) + '...' : 'NOT FOUND') 
        : (value || 'NOT FOUND');
    }
  });

  return NextResponse.json({
    envVars,
    hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY
  });
}
