// Omluvte prosím neostatek komentářů, jde o rychlou ukázku funkčnosti. Omluvte také nepříliš hezký kód, jde o rychlý prototyp. Omluvte ještě také nedodělanou strukturu stránky jedná se pouze o zkušební verzi. Děkuji za pochopení.
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as backendCalls from '../backendCalls';
import styles from './home.module.css';

export default function TeoriePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [theory, setTheory] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);

    // Demo fetchData volání - v ostrém provozu bude vracet reálná data z backendu
    backendCalls.fetchData(u.id, (data: any) => {
      if (data.theorie) {
        setTheory(data.theorie);
      } else {
        // fallback pro demo, pokud backend nic nevrátí
        setTheory({
          id: 1,
          title: 'Sčítání do 20',
          text: 'Sečítání čísel do 20: ukázka postupu, příklady a tipy, jak postupovat.',
        });
      }
    });
  }, [router]);

  if (!user || !theory) return null;

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <h3 className={styles.title}>Uživatel</h3>
        <p className={styles.plz}>{user.name}</p>
        <p>Role: {user.role}</p>
        <p>XP: {user.xp}</p>
        <p>Peníze: {user.penize}</p>
      </aside>

      <main className={styles.main}>
        <div style={{ maxWidth: 800, padding: 20 }}>
          <h1 className={styles.title}>{theory.title}</h1>
          <p style={{ color: '#cfeff0' }}>{theory.text}</p>

          <div style={{ marginTop: 20 }}>
            <button className={styles.btn} onClick={() => router.push('/priklady')}>
              Přejít na příklady
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



/* starý model

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
      <h1 className={styles.title}>1 + 1 = 2 *adminův účet*</h1>
      {/*<p>{JSON.stringify(data)}</p>*//*}
    </main>
  </div>
  );
}
*/