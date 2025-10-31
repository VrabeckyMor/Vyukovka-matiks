'use client';

import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
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
            Vítejte! 
            Tohle je úvodní stránka výukové aplikace pro žáky základních škol zaměřené na matematiku.
          </h1>
        
      </main>
    </div>
  );
}