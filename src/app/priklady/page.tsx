'use client';

import styles from '../Home.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Priklady() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [priklad, setPriklad] = useState("");
  const [userId, setUserId] = useState(null);

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
    }

    fetchUserAccount();
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.title}>{userId}</h1>
        <h1 className={styles.title}>{priklad}
        </h1><br />
        <input className={styles.input} value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
        <button className={styles.btn} onClick={() => {
          if (answer === correct) {
            alert("Správně!");
            generatePriklad();
            setAnswer("");
          } else {
            alert("Špatně, zkus to znovu.");
          }
        }}>Odeslat</button>
      </main>
    </div>
  );
}
