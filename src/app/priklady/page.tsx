'use client';

import styles from '../Home.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Priklady() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Tady bude sekce s příklady. Brzy doplníme!
        </h1>
      </main>
    </div>
  );
}


/*'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../Home.module.css';

type Example = { question: string; correctAnswer: string };
type UserData = { id: string; points: number; money: number };

const topics = [
  { id: 1, name: 'Sčítání do 20' },
  { id: 2, name: 'Odčítání do 20' },
  { id: 3, name: 'Násobení do 100' },
];

function generateRandomExample(topicId: number): Example {
  if (topicId === 1) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    return { question: `${a} + ${b} = ?`, correctAnswer: String(a + b) };
  }
  if (topicId === 2) {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * Math.min(10, a - 1));
    return { question: `${a} - ${b} = ?`, correctAnswer: String(a - b) };
  }
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} × ${b} = ?`, correctAnswer: String(a * b) };
}

export default function Priklady() {
  const router = useRouter();
  const params = useSearchParams();
  const [example, setExample] = useState<Example | null>(null);
  const [answer, setAnswer] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [topicId, setTopicId] = useState(Number(params.get('topicId')) || 1);
  const [counter, setCounter] = useState(0);

  const storageKey = 'currentExample';

  useEffect(() => {
    async function init() {
      try {
        const data = await backendCalls.getUserData();
        setUserData(data);
      } catch (err) {
        console.error('Chyba při načítání dat uživatele:', err);
      } finally {
        setLoading(false);
      }

      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.topicId === topicId && parsed.example) {
            setExample(parsed.example);
            setAnswer('');
            return;
          }
        }
      } catch {}
      const newEx = generateRandomExample(topicId);
      setExample(newEx);
      localStorage.setItem(storageKey, JSON.stringify({ topicId, example: newEx }));
      setAnswer('');
    }
    init();
  }, [topicId]);

  useEffect(() => {
    return () => {
      if (example) {
        localStorage.setItem(storageKey, JSON.stringify({ topicId, example }));
      }
    };
  }, [example, topicId]);

  async function checkAnswer() {
    if (!example || !userData) return;

    let newPoints = userData.points;
    let newMoney = userData.money;

    if (answer.trim() === example.correctAnswer) {
      alert('✅ Správně!');
      newPoints += 10;
      newMoney += 5;
    } else {
      alert(`❌ Špatně! Správná odpověď je ${example.correctAnswer}`);
      newPoints -= 5;
    }

    const updated = { ...userData, points: newPoints, money: newMoney };
    setUserData(updated);

    try {
      await backendCalls.updateUserData(updated);
    } catch (err) {
      console.error('Chyba při ukládání dat:', err);
    }

    const newCount = counter + 1;
    setCounter(newCount);

    if (newCount >= 20) {
      const cont = confirm('Dokončil jsi lekci. Chceš pokračovat v procvičování?');
      if (!cont) {
        setCounter(0);
        return;
      }
    }

    nextExample();
  }

  function nextExample() {
    const newEx = generateRandomExample(topicId);
    setExample(newEx);
    setAnswer('');
    localStorage.setItem(storageKey, JSON.stringify({ topicId, example: newEx }));
  }

  function goToTheory() {
    if (example) {
      localStorage.setItem(storageKey, JSON.stringify({ topicId, example }));
    }
    router.push(`/teorie?topicId=${topicId}`);
  }

  function handleTopicChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTopicId(Number(e.target.value));
    setCounter(0);
  }

  if (loading) return <p>Načítám...</p>;
  if (!example) return <p>Načítám příklady...</p>;

  return (
    <div className={styles.container}>
      <h1>Příklady</h1>

      <label>
        Vyber téma:
        <select value={topicId} onChange={handleTopicChange} style={{ marginLeft: 8 }}>
          {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </label>

      {userData && (
        <p>
          <strong>Body:</strong> {userData.points} |{' '}
          <strong>Peníze:</strong> {userData.money} Kč
        </p>
      )}

      <p><strong>Otázka:</strong> {example.question}</p>

      <input
        type="text"
        placeholder="Vaše odpověď"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={checkAnswer}>Odeslat</button>
        <button onClick={nextExample} style={{ marginLeft: 8 }}>Nový příklad</button>
        <button onClick={goToTheory} style={{ marginLeft: 16 }}>Přejít na teorii</button>
      </div>
    </div>
  );
}*/
