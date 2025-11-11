'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../Home.module.css';

export default function Teorie() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main} style={{ display: 'flex', flexDirection: 'column'}}>
          <h1 className={styles.title}>Na této stránce právě pracujeme!
          </h1>
          <h2 style={{fontSize: '10vh'}}>
            👷🏻‍♂️
          </h2>
      </main>
    </div>
  );
}
