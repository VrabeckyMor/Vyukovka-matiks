'use client';

import styles from '../Home.module.css';
import React, { useState } from 'react';
import * as backendCalls from '../backendCalls';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any>({});

  if (loggedIn) {
    if (data.profile === 3) {
      return (
        <div className={styles.container}>
          <aside className={styles.side}>
            <button className={styles.btn} onClick={() => router.push("/")}>O NÁS</button>
            <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
            <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
          </aside>
          <main className={styles.main}>
            <h1 className={styles.title}>1 + 1 = 2 *žákovský účet*</h1>
            <p>{JSON.stringify(data)}</p>
          </main>
        </div>
      );
    } else if (data.profile === 2) {
      return (
        <div className={styles.container}>
          <aside className={styles.side}>
            <button className={styles.btn} onClick={() => router.push("/")}>O NÁS</button>
            <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
            <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
          </aside>
          <main className={styles.main}>
            <h1 className={styles.title}>1 + 1 = 2 *učitelský účet*</h1>
            <p>{JSON.stringify(data)}</p>
          </main>
        </div>
      );
    } else if (data.profile === 1) {
      return (
        <div className={styles.container}>
          <aside className={styles.side}>
            <button className={styles.btn} onClick={() => router.push("/")}>O NÁS</button>
            <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
            <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
          </aside>
          <main className={styles.main}>
            <h1 className={styles.title}>1 + 1 = 2 *adminův účet*</h1>
            {/*<p>{JSON.stringify(data)}</p>*/}
          </main>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.kontejnr}>
        <main className={styles.lockin}>
          <h1 className={styles.title}>PROSÍM, PŘIHLAŠTE SE</h1>
          <div className={styles.inputRow}>
            <input type="text" placeholder="Uživatelské jméno" className={styles.input} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Heslo" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={styles.btn} onClick={() => backendCalls.login(username, password, setLoggedIn, setData)}>PŘIHLÁSIT SE</button>
        </main >
      </div >
    );
  }
}