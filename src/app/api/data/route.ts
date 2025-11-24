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
                score: 0
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
    try {
        const body = await req.json();
        const id = body.id;
        const action = body.action;

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
        
        if (action === 'increase') {
            newScore = Math.round((1000 - oldScore.score) / 10 + oldScore.score);
        } else if (action === 'decrease') {
            newScore = Math.round(oldScore.score - (oldScore.score / 10));
        } else {
            return new Response(JSON.stringify({ error: 'Invalid action' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        //if action = incease+, increase score+ by 10% of the difference between 1000 and current score
        //if action = decrease+, decrease score+ by 10% of current score
        //if action = increase-, increase score- by 10% of the difference between 1000 and current score
        //if action = decrease-, decrease score- by 10% of current score
        //if action = increase*, increase score* by 10% of the difference between 1000 and current score
        //if action = decrease*, decrease score* by 10% of current score
        //if action = increase/, increase score/ by 10% of the difference between 1000 and current score
        //if action = decrease/, decrease score/ by 10% of current score

        const updatedScore = await prisma.score.update({
            where: { id },
            data: { score: newScore },
        });

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