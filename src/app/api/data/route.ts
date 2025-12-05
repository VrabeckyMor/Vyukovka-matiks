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

        let score = await prisma.score.findUnique({ //nefachčí
            where: { id },
        });

        if (!score) {
            // ensure record is created before continuing
            await prisma.score.create({
                data: {
                    id,
                    score1: 0,
                    score2: 0,
                    score3: 0,
                    score4: 0,
                    score5: 0,
                    score6: 0,
                },
            });
        }

        score = await prisma.score.findUnique({ where: { id } });

        // return the score object directly for a consistent client shape
        return new Response(JSON.stringify(score), {
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
    try {
        const body = await req.json();
        const id = body.id;
        const action = body.action;
        // topicId may come as a string from the client; coerce to number
        const topicId = Number(body.topicId);

        if (!id || !action) {
            return new Response(JSON.stringify({ error: 'Missing id or action in request body' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const oldScore = await prisma.score.findUnique({ where: { id } });

        if (!oldScore) {
            return new Response(JSON.stringify({ error: 'Score not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let newScore: number;

        if (action === "increase") {
            if (topicId === 1) {
                newScore = Math.round((1000 - oldScore.score1) / 10 + oldScore.score1);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score1: newScore },
                });
            } else if (topicId === 2) {
                newScore = Math.round((1000 - oldScore.score2) / 10 + oldScore.score2);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score2: newScore },
                });
            } else if (topicId === 3) {
                newScore = Math.round((1000 - oldScore.score3) / 10 + oldScore.score3);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score3: newScore },
                });
            } else if (topicId === 4) {
                newScore = Math.round((1000 - oldScore.score4) / 10 + oldScore.score4);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score4: newScore },
                });
            } else if (topicId === 5) {
                newScore = Math.round((1000 - oldScore.score5) / 10 + oldScore.score5);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score5: newScore },
                });
            } else if (topicId === 6) {
                newScore = Math.round((1000 - oldScore.score6) / 10 + oldScore.score6);
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score6: newScore },
                });
            }
        } else if (action === "decrease") {
            if (topicId === 1) {
                newScore = Math.round(oldScore.score1 - (oldScore.score1 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score1: newScore },
                });
            } else if (topicId === 2) {
                newScore = Math.round(oldScore.score2 - (oldScore.score2 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score2: newScore },
                });
            } else if (topicId === 3) {
                newScore = Math.round(oldScore.score3 - (oldScore.score3 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score3: newScore },
                });
            } else if (topicId === 4) {
                newScore = Math.round(oldScore.score4 - (oldScore.score4 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score4: newScore },
                });
            } else if (topicId === 5) {
                newScore = Math.round(oldScore.score5 - (oldScore.score5 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score5: newScore },
                });
            } else if (topicId === 6) {
                newScore = Math.round(oldScore.score6 - (oldScore.score6 / 10));
                const updatedScore = await prisma.score.update({
                    where: { id },
                    data: { score6: newScore },
                });
            }
        }

        const updatedScore = await prisma.score.findUnique({ where: { id } });

        return new Response(JSON.stringify(updatedScore), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('POST Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}