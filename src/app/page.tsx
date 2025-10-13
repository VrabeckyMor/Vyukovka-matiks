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

    if (loggedIn&& data?.profile) {
      localStorage.setItem('user', JSON.stringify(data));
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