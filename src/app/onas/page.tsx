'use client';

import styles from '../Home.module.css';
import React, { useState, useEffect } from 'react';
import * as backendCalls from '../backendCalls';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>({});

useEffect(() => {
  const storedData = localStorage.getItem('user');
  if (!storedData) {
    router.push('/login');
    return;
  }
  const userData = JSON.parse(storedData);
  setData(userData);
 backendCalls.fetchData(userData.id, setData);
}, [router]);


  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>

      <main className={styles.main}>
        {data.profile === 3 && (
          <h1 className={styles.title}>
            Vítejte ve výukové části pro žáky! 
            Tato aplikace umožňuje procvičovat si znalosti matematiky v sekci Příklady, nebo se učit nové vědomosti v sekci Teorie. 
            Žák může sbírat body a peníze za správně vyřešené úkoly a sledovat svůj pokrok.
          </h1>
        )}
        {data.profile === 2 && (
          <h1 className={styles.title}>
            Vítejte v učitelské části! 
            Zde můžete zadávat úkoly a spravovat vaši třídu, vytvářet nové žáky a sledovat jejich pokrok.
            Učitel má přehled o pokroku jednotlivých žáků, jejich bodech a penězích.
          </h1>
        )}
        {data.profile === 1 && (
          <h1 className={styles.title}>
            Vítejte v administrátorské části! 
            Zde můžete spravovat účty učitelů, žáků, příklady a učební materiály, vytvářet nové učitele a třídy.
            Administrátor má plný přehled o všech uživatelích a jejich aktivitách.
          </h1>
        )}
      </main>
    </div>
  );
}

  /*return (
    <div className={styles.container}>
      <aside className={styles.side}>
      <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
      <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
      <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
    </aside>
    <main className={styles.main}>
      <h1 className={styles.title}>ňáký yappování a co tu je pro gulyho a vojtu *adminův účet*</h1>
      {<p>{JSON.stringify(data)}</p>}
    </main>
  </div>
  );
}*/