'use client';

import styles from '../Home.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Priklady() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [priklad, setPriklad] = useState("");
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState(0);

  function generatePriklad() {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    setCorrect((a + b).toString());
    setPriklad(`${a} + ${b} = ?`);
  }
  useEffect(() => {
    generatePriklad();

    async function fetchUserAccount() {
      const response = await fetch('/api/getId');
      const data = await response.json();
      setUserId(data.userId);
      if (data.userId) {
        await initializeScore(data.userId);
      }
    }

    fetchUserAccount();
  }, []);

  async function changeScore(id:String, action:String) {
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, action }),
    });
    initializeScore(userId);
  }

  async function initializeScore(id:String) {
    if (!id) return;

    try {
        const response = await fetch(`/api/data?id=${id}`);
        
        if (!response.ok) {
            console.error('Failed to fetch score:', response.status);
            return;
        }

        const data = await response.json();
        if (data && typeof data.score === 'number') {
            setScore(data.score);
        }
    } catch (error) {
        console.error('Error initializing score:', error);
    }
}

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main}>
        <div className={styles.topnav}>
          <h1 className={styles.title}>skóre: {score}</h1><br />
          <h1 className={styles.title}>{priklad}
          </h1>
        </div>
        <input className={styles.input} value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
        <button className={styles.btn} onClick={() => {
          if (answer === correct) {
            alert("Správně!");
            changeScore(userId, "increase");
            initializeScore(userId);
            generatePriklad();
            setAnswer("");
          } else {
            alert("Špatně, zkus to znovu.");
            changeScore(userId, "decrease");
            initializeScore(userId);
            setAnswer("");
          }
        }}>Odeslat</button>
      </main>
    </div>
  );
}
