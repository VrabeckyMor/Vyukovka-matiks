'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as backendCalls from '../backendCalls';
import styles from '../Home.module.css';

export default function Priklady() {
  const router = useRouter();
  const params = useSearchParams();

  const [examples, setExamples] = useState<any[]>([]);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [topicId, setTopicId] = useState<number>(1);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const tid = Number(params.get('topicId')) || 1;
    setTopicId(tid);
    backendCalls.fetchExamples(tid, setExamples);
  }, [params]);

  const example = examples[currentExampleIndex];

  function checkAnswer() {
    if (example && answer === example.correctAnswer) {
      alert('Správně!');
    } else {
      alert(`Špatně! Správná odpověď je ${example.correctAnswer}`);
    }
  }

  function goToTheory() {
    const currentTopic = {
      topicId,
      currentExampleIndex,
    };
    localStorage.setItem('currentTopic', JSON.stringify(currentTopic));
    router.push(`/teorie?topicId=${topicId}`);
  }

  if (!example) return <p>Načítám příklady...</p>;

  return (
    <div className={styles.container}>
      <h1>Příklady — Téma {topicId}</h1>
      <p><strong>Otázka:</strong> {example.question}</p>

      <input
        type="text"
        placeholder="Vaše odpověď"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Odeslat</button>
      <button onClick={goToTheory}>Přejít na teorii</button>
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