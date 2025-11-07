import { PrismaClient } from '@prisma/client';
import { getSessionCookie } from 'better-auth/cookies';
import { getUserAccount } from '@/utils/getUserAccount';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const rawToken = getSessionCookie(req);

    if (!rawToken) {
      console.error('Session token not provided');
      return new Response(JSON.stringify({ error: 'Session token not provided' }), { status: 401 });
    }

    console.log('API Route Session Token (raw):', rawToken);

    // Předání původního tokenu bez dalšího zakódování
    const data = await getUserAccount({ cookies: { 'better-auth-session': rawToken } });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "gg bro" }), { status: 401 });
  }
}