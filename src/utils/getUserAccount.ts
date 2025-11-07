import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserAccount(req: any) {
  try {
    const rawToken = req.cookies['better-auth-session'] || req.headers['authorization'];

    if (!rawToken) {
      console.error('Session token not provided');
      throw new Error('Session token not provided');
    }

    console.log('getUserAccount - Session Token (raw):', rawToken);

    // Extrahujte část tokenu před první tečkou
    const tokenSegment = rawToken.split('.')[0];
    console.log('getUserAccount - Token Segment:', tokenSegment);

    const session = await prisma.session.findUnique({
      where: {
        token: tokenSegment, // Použijte pouze první část tokenu
      },
      include: {
        user: { select: { id: true } },
      },
    });

    console.log('getUserAccount - Database Session:', session);

    if (!session) {
      console.error('Session not found in database');
      throw new Error('Session not found');
    }

    if (!session.user) {
      console.error('User not found for session');
      throw new Error('User not authenticated');
    }

    console.log('getUserAccount - Authenticated User ID:', session.user.id);
    return {
      userId: session.user.id,
    };
  } catch (error) {
    throw error;
  }
}