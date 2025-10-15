'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as backendCalls from '../backendCalls';
import styles from '../Home.module.css';

export default function Teorie() {
  const router = useRouter();
  const params = useSearchParams();

  const [theory, setTheory] = useState<any>(null);
  const [topicId, setTopicId] = useState<number>(1);

  useEffect(() => {
    const tid = Number(params.get('topicId')) || 1;
    setTopicId(tid);
    backendCalls.fetchTheory(tid, setTheory);
  }, [params]);

  function handleBack() {
    const saved = localStorage.getItem('currentTopic');
    if (saved) {
      const data = JSON.parse(saved);
      router.push(`/priklady?topicId=${data.topicId}&index=${data.currentExampleIndex}`);
    } else {
      router.push('/priklady');
    }
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




    /*</div>// Demo fetchData volání - v ostrém provozu bude vracet reálná data z backendu
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
  }, ([router]);

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
*/


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