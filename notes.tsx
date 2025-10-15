/*

    
Poznámky k projektu:
- V page.tsx teorie a priklady ještě není vše hotovo, zatím to nefunguje.
- Do backendu je potřeba dodělat funkce z Frontendu.
- Tj. 
- V schema.prisma je potřeba přidat model:
    -Topic:
     model Topic {
     id        Int       @id @default(autoincrement())
     title     String
     theory    Theory?  
     examples  Example[]
    }
    -Example:
    model Example {
     id        Int       @id @default(autoincrement())
     topicId   Int      @unique
     topic     Topic     @relation(fields: [topicId], references: [id])
     question  String
     correctAnswer    String
     explanation  String?
     difficulty Int
    }
    -Theory:
    model Theory {
     id       Int       @id @default(autoincrement())
     topicId  Int       @unique
     content  String
     topic    Topic     @relation(fields: [topicId], references: [id])
    }

- do api/teorie/route.ts dodělat :
     import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topicId = Number(searchParams.get('topicId'));

  const theory = await prisma.theory.findUnique({
    where: { topicId },
  });

  if (!theory) {
    return NextResponse.json({ error: 'Theory not found' }, { status: 404 });
  }

  return NextResponse.json(theory);
}

- do api/priklady/route.ts dodělat:
   import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topicId = Number(searchParams.get('topicId'));

  const examples = await prisma.example.findMany({
    where: { topicId },
  });

  return NextResponse.json(examples);
}


- do backendCalls.ts dodělat:

// src/app/backendCalls.tsx
export async function fetchTheory(topicId: number, setTheory: Function) {
  try {
    const res = await fetch(`/api/theory?topicId=${topicId}`);
    if (!res.ok) throw new Error('Chyba při načítání teorie');
    const data = await res.json();
    setTheory(data);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchExamples(topicId: number, setExamples: Function) {
  try {
    const res = await fetch(`/api/examples?topicId=${topicId}`);
    if (!res.ok) throw new Error('Chyba při načítání příkladů');
    const data = await res.json();
    setExamples(data);
  } catch (error) {
    console.error(error);
  }
}


- Zatím udělán jen teoretický návrh s funkcemi, které jsou ve frontendu ale zatím ne v backendu
- Zítra dodělám konkrérní příklady a teorii a pak už by to mělo fungovat.
- Prosím o dodělání backendu, pokud byste na něco přišli, dejte vědět.
-hlavní funkce a jejich ukoly:
- login()
    Přihlásí uživatele, uloží user do localStorage, nastaví stav přihlášení.
-fetchUserData()
    Načte aktuální stav uživatele z backendu (XP, peníze, progress).
-fetchExamples()
    Vrátí seznam příkladů pro dané téma.
-submitAnswer()
    Odešle odpověď uživatele.
    Vrátí, zda byla odpověď správná, správné řešení a postup.
    Aktualizuje XP a peníze a uloží nový stav uživatele.
-fetchTheory()
    Načte teorii pro dané téma.

-My nemáme vube lib??? jsem teď zjistil jako že tam není?

- Data (priklady a teorii) jsem myslel ze budeme dělat do souboru prisma/seed.ts a pak to tam nahrát přes npx prisma db seed
- Zatím jsem to neskoušel jen podle mě by to mělo fungovat teď jsou zatím k tomu pripravené page teorie a priklady


*/