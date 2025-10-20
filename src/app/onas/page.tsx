'use client';

import styles from '../Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/onas")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/onas")}>PŘÍKLADY</button>
      </aside>

      <main className={styles.main}>
          <h1 className={styles.title}>
            Vítejte ve výukové části pro žáky! 
            Tato aplikace umožňuje procvičovat si znalosti matematiky v sekci Příklady, nebo se učit nové vědomosti v sekci Teorie. 
            Žák může sbírat body a peníze za správně vyřešené úkoly a sledovat svůj pokrok.
          </h1>
        
      </main>
    </div>
  );
}