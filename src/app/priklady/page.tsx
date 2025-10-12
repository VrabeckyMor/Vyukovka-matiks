// Omluvte prosím neostatek komentářů, jde o rychlou ukázku funkčnosti. Omluvte také nepříliš hezký kód, jde o rychlý prototyp. Omluvte ještě také nedodělanou strukturu stránky jedná se pouze o zkušební verzi. Děkuji za pochopení.
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as backendCalls from '../backendCalls';
import styles from '../home.module.css';

export default function PrikladyPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [examples, setExamples] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);

    // Demo volání backendu (v ostrém provozu by se fetchovalo z API)
    backendCalls.fetchData(u.id, (data) => {
      // pokud by data obsahovala příklady, použijeme je, jinak demo
      if (data.examples) {
        setExamples(data.examples);
      } else {
        setExamples([
          {
            id: 1,
            question: '5 + 7 = ?',
            correct: '12',
            solution: '5 + 7 = 12',
          },
          {
            id: 2,
            question: '8 + 4 = ?',
            correct: '12',
            solution: '8 + 4 = 12',
          },
        ]);
      }
    });
  }, [router]);

  const handleCheck = (id: number) => {
    const answer = answers[id];
    const example = examples.find((ex) => ex.id === id);
    if (!example) return;

    if (answer === example.correct) {
      setFeedback((prev) => ({ ...prev, [id]: 'Správně! +1 XP' }));
      // Aktualizace bodů a peněz v demo režimu
      setUser((prev: any) => ({
        ...prev,
        xp: prev.xp + 1,
        penize: prev.penize + 10,
      }));
    } else {
      setFeedback((prev) => ({ ...prev, [id]: `Špatně! Správně je: ${example.solution}` }));
      setUser((prev: any) => ({
        ...prev,
        xp: Math.max(prev.xp - 1, 0), // odečteme XP
      }));
    }
  };

  if (!user || !examples.length) return null;

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <h3 className={styles.title}>Uživatel</h3>
        <p className={styles.plz}>{user.name}</p>
        <p>Role: {user.role}</p>
        <p>XP: {user.xp}</p>
        <p>Peníze: {user.penize}</p>
      </aside>

      <main className={styles.main}>
        <div style={{ maxWidth: 800, padding: 20 }}>
          <h1 className={styles.title}>Příklady</h1>
          {examples.map((ex) => (
            <div key={ex.id} style={{ marginBottom: 20 }}>
              <p style={{ color: '#cfeff0', fontSize: '1.2rem' }}>{ex.question}</p>
              <input
                type="text"
                value={answers[ex.id] || ''}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [ex.id]: e.target.value }))
                }
                className={styles.input}
              />
              <button className={styles.btn} onClick={() => handleCheck(ex.id)}>
                Zkontrolovat
              </button>
              {feedback[ex.id] && (
                <p style={{ color: '#a84df3', marginTop: '5px' }}>{feedback[ex.id]}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}





/* starý model příkladů

'use client';

import styles from '../Home.module.css';
import React, { useState } from 'react';
import * as backendCalls from '../backendCalls';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
      <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
      <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
      <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
    </aside>
    <main className={styles.main}>
      <h1 className={styles.title}>1 + 1 = X *adminův účet*</h1>
      {/*<p>{JSON.stringify(data)}</p>*//*}
    </main>
  </div>
  );
}
  */