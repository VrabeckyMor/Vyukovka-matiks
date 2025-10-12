// Omluvte prosím neostatek komentářů, jde o rychlou ukázku funkčnosti. Omluvte také nepříliš hezký kód, jde o rychlý prototyp. Omluvte ještě také nedodělanou strukturu stránky jedná se pouze o zkušební verzi. Děkuji za pochopení.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as backendCalls from './backendCalls';
import styles from './home.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Pokusí se přihlásit, očekává, že backend vrátí user objekt
  const handleLogin = async () => {
    if (!username || !password) return alert('Vyplň uživatelské jméno a heslo');
    setLoading(true);
    try {
      // očekáváme, že backendCalls.login vrátí user objekt { id, name, role, xp, penize }
      const user = await backendCalls.login(username, password);
      if (!user) {
        alert('Přihlášení selhalo');
        setLoading(false);
        return;
      }

      // uložíme uživatele lokálně (frontend/paměť)
      localStorage.setItem('user', JSON.stringify(user));

      // přesměrujeme podle role (žák/student -> teorie/priklady; učitel/admin později)
      if (user.role === 'student' || user.role === 'zak') {
        router.push('/teorie');
      } else if (user.role === 'teacher') {
        router.push('/onas'); // nebo jinam podle potřeby
      } else {
        router.push('/onas');
      }
    } catch (err) {
      console.error('Login error', err);
      alert('Chyba při přihlášení');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.kontejnr}>
      <main className={styles.lockin}>
        <h1 className={styles.plz}>PŘIHLÁŠENÍ</h1>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={handleLogin} disabled={loading}>
          {loading ? 'Probíhá...' : 'Přihlásit se'}
        </button>
      </main>
    </div>
  );
}











/* starý model loginu

'use client';

import styles from './Home.module.css';
import React, { useState } from 'react';
import * as backendCalls from './backendCalls';
import { useRouter } from 'next/navigation';

export default function Home() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<any>({});
    const router = useRouter();

    if (loggedIn) {
        if (data.profile === 3) {
            return (
                <>
                    {router.push("/onas")}
                </>
            );
        } else if (data.profile === 2) {
            return (
                <>
                    {router.push("/onas")}
                </>
            );
        } else if (data.profile === 1) {
            return (
                <>
                    {router.push("/onas")}
                </>
            );
        }
    } else {
        return (
            <div className={styles.kontejnr}>
                <main className={styles.lockin}>
                    <h1 className={styles.plz}>PROSÍM, PŘIHLAŠTE SE</h1>
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
*/