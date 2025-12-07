'use client';

import styles from '../Home.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { set } from 'better-auth';
import { checkEndpointConflicts } from 'better-auth/api';

export default function Priklady() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [priklad, setPriklad] = useState("");
  const [userId, setUserId] = useState("");
  const [globalScore, setGlobalScore] = useState(0);
  const [topicId, setTopicId] = useState<number>(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [score6, setScore6] = useState(0);

  const currentScore = topicId === 1 ? score1
    : topicId === 2 ? score2
      : topicId === 3 ? score3
        : topicId === 4 ? score4
          : topicId === 5 ? score5
            : score6;

  function generatePriklad() {
    generatePrikladFor();
  }

  function generatePrikladFor(topic?: number) {
    const topicGenerators: Record<number, () => void> = {
      1: () => {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        setCorrect((a + b).toString());
        setPriklad(`${a} + ${b} = ?`);
      },
      2: () => {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * a) + 1;
        setCorrect((a - b).toString());
        setPriklad(`${a} - ${b} = ?`);
      },
      3: () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setCorrect((a * b).toString());
        setPriklad(`${a} × ${b} = ?`);
      },
      4: () => {
        const b = Math.floor(Math.random() * 100) + 1;
        const res = b * (Math.floor(Math.random() * 10) + 1);
        const a = b * res;
        setCorrect(res.toString());
        setPriklad(`${a} ÷ ${b} = ?`);
      },
      5: () => {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        const c = Math.floor(Math.random() * 50) + 1;
        setCorrect((a + b - c).toString());
        setPriklad(`${a} + ${b} - ${c} = ?`);
      },
      6: () => {
        const x = Math.floor(Math.random() * 10) - 10;
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 10) - 10;
        const c = a * x + b;
        setCorrect(x.toString());
        setPriklad(`${a}x + ${b} = ${c}`);
      }

    };
    const idToUse = typeof topic === 'number' ? topic : topicId;
    if (topicGenerators[idToUse]) {
      topicGenerators[idToUse](); //jikar
    } else {
      console.error(`Neznámý topicId: ${idToUse}`);
    }
  }

  function prevTopic() {
    const prev = topicId === 1 ? 6 : topicId - 1;
    setTopicId(prev);
    generatePrikladFor(prev);
  }

  function nextTopic() {
    const nxt = topicId === 6 ? 1 : topicId + 1;
    setTopicId(nxt);
    generatePrikladFor(nxt);
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

  async function changeScore(id: string, action: string) {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, action, topicId }),
    });

    const data = await response.json();
    if (data) {
      setScore1(data.score1);
      setScore2(data.score2);
      setScore3(data.score3);
      setScore4(data.score4);
      setScore5(data.score5);
      setScore6(data.score6);
      setGlobalScore(data.globalScore);
    }
  }

  async function initializeScore(id: string) {
    if (!id) return;

    try {
      const response = await fetch(`/api/data?id=${id}&topicId=${topicId}`);

      if (!response.ok) {
        console.error('Failed to fetch score:', response.status);
        return;
      }

      let data = await response.json();
      // if API returns { score: {...} } handle that, otherwise accept plain object
      if (data && data.score) data = data.score;

      if (data) {
        if (typeof data.score1 === 'number') setScore1(data.score1);
        if (typeof data.score2 === 'number') setScore2(data.score2);
        if (typeof data.score3 === 'number') setScore3(data.score3);
        if (typeof data.score4 === 'number') setScore4(data.score4);
        if (typeof data.score5 === 'number') setScore5(data.score5);
        if (typeof data.score6 === 'number') setScore6(data.score6);
        if (typeof data.globalScore === 'number') setGlobalScore(data.globalScore);
      }
    } catch (error) {
      console.error('Error initializing score:', error);
    }
  }

  /* Potřeba vytvořit navigační lištu pro výběr typu příkladů. DĚKUJI
  <nav style={{
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#eee",
    position: "fixed",
    top: 0, // Umístí lištu na vrchol stránky
    left: 0,
    width: "100%",
    zIndex: 1000,
  }}>
    <button onClick={() => { setTopicId(1); generatePriklad(); }}>Sčítání do 50</button>
    <button onClick={() => { setTopicId(2); generatePriklad(); }}>Odčítání do 50</button>
    <button onClick={() => { setTopicId(3); generatePriklad(); }}>Násobení do 100</button>
    <button onClick={() => { setTopicId(4); generatePriklad(); }}>Dělení do 100</button>
    <button onClick={() => { setTopicId(5); generatePriklad(); }}>Sčítání a odčítání do 50</button>
    <button onClick={() => { setTopicId(6); generatePriklad(); }}>Lineární rovnice</button>
  </nav>
  */

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main}>
        <div style={{ position: 'fixed', top: '52.5%', display: 'flex', gap: '40vh', alignItems: 'center', zIndex: 99999 }}>
          <button onClick={prevTopic} aria-label="previous topic" style={{ background: '#0050b3', color: '#fff', fontSize: '3vh', width: '4.5vh', height: '4.5vh', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>‹</button>
          <button onClick={nextTopic} aria-label="next topic" style={{ background: '#0050b3', color: '#fff', fontSize: '3vh', width: '4.5vh', height: '4.5vh', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>›</button>
        </div>

        <h1 className={styles.title}>Skóre{topicId}: {typeof currentScore === 'number' ? currentScore : 0}</h1>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '2vh', background: '#1b68c035', borderRadius: '50px', paddingTop: '10vh', paddingBottom: '10vh', paddingLeft: '15vh', paddingRight: '15vh', margin: '4vh' }}>
          <h1 className={styles.title} style={{ margin: 0,marginBottom: '2vh',  textAlign: 'center' }}>{priklad}</h1>
          <div style={{ width: '60%', minWidth: '240px' }}>
            <input style={{ display: 'block', fontSize: '2.5vh', width: '100%', backgroundColor: '#0085855e', padding: '1vh', borderRadius: '12px', border: '3px solid #429c9c42' }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
        </div>
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

      </main >
    </div >
  );
}
