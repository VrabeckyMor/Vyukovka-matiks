import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json({ success: false });
    }


    return NextResponse.json({ user.profile, user.score, user.credits });

}