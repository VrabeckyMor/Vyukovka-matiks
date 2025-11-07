import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const body = await req.json();
    const id = body.id;

    if (!id) {
        return new Response(JSON.stringify({ error: 'Missing id in request body' }), { status: 400 });
    }

    const score = await prisma.score.upsert({
        where: { id },
        update: {},
        create: { id },
    });

    return new Response(JSON.stringify(score), { status: 200 });
}

export async function POST(req: Request) {
    const body = await req.json();
    const id = body.id;
    const action = body.action;

    if (!id || !action) {
        return new Response(JSON.stringify({ error: 'Missing id or action in request body' }), { status: 400 });
    }

    if (action === 'increase') {
        const oldScore = await prisma.score.findUnique({ where: { id } });
        const newScore = Math.round((1000 - oldScore.score) / 10 + oldScore.score);
        const updatedScore = await prisma.score.update({
            where: { id },
            data: { score: newScore },
        });
        return new Response(JSON.stringify(updatedScore), { status: 200 });

    } else if (action === 'decrease') {
        const oldScore = await prisma.score.findUnique({ where: { id } });
        const newScore = Math.round(oldScore.score - (oldScore.score / 10));
        const updatedScore = await prisma.score.update({
            where: { id },
            data: { score: newScore },
        });
        return new Response(JSON.stringify(updatedScore), { status: 200 });
    }
