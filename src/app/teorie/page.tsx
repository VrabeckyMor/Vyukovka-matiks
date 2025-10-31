'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../Home.module.css';

export default function Teorie() {
  const router = useRouter();
  const params = useSearchParams();
  const topicId = Number(params.get('topicId')) || 1;
  const [theory, setTheory] = useState<any>(null);

  function handleBack() {
    router.push(`/priklady?topicId=${topicId}`);
  }

  if (!theory) return <p>Načítám teorii...</p>;

  return (
    <div className={styles.container}>
      <h1>Teorie — Téma {topicId}</h1>
      <p>{theory.content}</p>

      <button onClick={handleBack}>Zpět na příklady</button>
    </div>
  );
}
