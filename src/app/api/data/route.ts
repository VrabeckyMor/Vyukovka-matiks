import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing id parameter' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const score = await prisma.score.upsert({
            where: { id },
            update: {},
            create: { 
                id,
                score: 0  // Inicializace score na 0
            },
        });

        return new Response(JSON.stringify({ score: score.score }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('GET Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
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
