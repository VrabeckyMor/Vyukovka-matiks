'use client';

import styles from '../Home.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { set } from 'better-auth';

export default function Priklady() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [priklad, setPriklad] = useState("");
  const [userId, setUserId] = useState("");
  const [globalScore, setGlobalScore] = useState(0);
  const [normalScore, setNormalScore] = useState(0);
  const [topicId, setTopicId] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [score6, setScore6] = useState(0);

  function generatePriklad() {
    const topicGenerators = {
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
    if (true) { //if (topicGenerators[topicId]) {
      topicGenerators[topicId](); //topicGenerators[topicId](); 
    }else {
      console.error(`Neznámý topicId: ${topicId}`);
    }
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

  async function changeScore(id: String, action: String) {
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

  async function initializeScore(id: String) {
    if (!id) return;

    try {
      const response = await fetch(`/api/data?id=${id}&topicId=${topicId}`);

      if (!response.ok) {
        console.error('Failed to fetch score:', response.status);
        return;
      }

      const data = await response.json();
      if (data) {
        if (typeof data.normalScore === 'number') {
          setNormalScore(data.normalScore);
        }
        if (typeof data.globalScore === 'number') {
          setGlobalScore(data.globalScore);
        }
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
        <div style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h1 className={styles.title}>Globální skóre: {globalScore}</h1>
          <h1 className={styles.title}>Skóre1: {score1}</h1>
          <h1 className={styles.title}>Skóre2: {score2}</h1>
          <h1 className={styles.title}>Skóre3: {score3}</h1>
          <h1 className={styles.title}>Skóre4: {score4}</h1>
          <h1 className={styles.title}>Skóre5: {score5}</h1>
          <h1 className={styles.title}>Skóre6: {score6}</h1>
          <div style={{alignItems: 'center', display: 'flex', flexDirection: 'row', gap: '2vh' }}>
            <h1 className={styles.title}>{priklad}
            </h1>
            <input style={{ display: 'block', fontSize: '2.5vh', width: '50%', backgroundColor: '#0085855e', padding: '1vh', borderRadius: '12px', border: '2px solid #00000042' }} value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
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
        </div>
      </main >
    </div >
  );
}
