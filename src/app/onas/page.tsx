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
      <h1 className={styles.title}>ňáký yappování a co tu je pro gulyho a vojtu *adminův účet*</h1>
      {/*<p>{JSON.stringify(data)}</p>*/}
    </main>
  </div>
  );
}