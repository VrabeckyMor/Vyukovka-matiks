'use client';

import styles from './Home.module.css';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client'

export default function Home() {
  const router = useRouter();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [sepExpanded, setSepExpanded] = useState(false);

  // --------- Login kód ---------
  const { data: session, isPending } = useSession()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      setError(null)

      if (isRegistering) {
        await signUp.email({ email, password, name })
      } else {
        await signIn.email({ email, password })
      }

      setEmail('')
      setPassword('')
      setName('')
      router.push('/onas')

    } catch (err: any) {
      setError(err?.message || 'Chyba při přihlášení/registraci')
    }
  }
  // -----------------------------



  useEffect(() => {
    setShowCookieConsent(true);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleRejectCookies = () => {
    window.close();
    setTimeout(() => {
      window.location.href = 'https://www.google.com';
    }, 100);
  };

  return (
    <div className={styles.container}>
      {showCookieConsent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          zIndex: 10000
        }}>
          <div style={{
            backgroundColor: '#aafff8ff',
            padding: '9vh',
            borderRadius: '20px',
            maxWidth: '75vh',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            color: '#000536ff'
          }}>
            <h2 style={{ marginBottom: '0.5vh', fontSize: '4vh', fontWeight: 'bold' }}>
              🍪 Povol cookies plz
              <img src="/plz.jpg" alt="plz" className={styles.headerImg} />

            </h2>
            <div
              role="presentation"
              aria-hidden="true"
              onMouseEnter={() => setSepExpanded(true)}
              onMouseLeave={() => setSepExpanded(false)}
              style={{
                width: sepExpanded ? '100%' : '60%',
                maxWidth: '60vh',
                height: '6px',
                margin: '2vh auto',
                background: '#00b3ca9d',
                borderRadius: '3px',
                transition: 'width 300ms ease, opacity 200ms ease',
                opacity: 0.6,
              }}
            />
            <p style={{ marginBottom: '4vh', fontSize: '2.5vh', lineHeight: '1.5' }}>
              Plzky dej mi sušenky, bez nich tahle stránka nebude fungovat a to já nechci. Souhlasíš s nimi?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleRejectCookies}
                style={{
                  padding: '2vh',
                  fontSize: '2.5vh',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: '0.3s',
                  boxShadow: '5px 5px 12px #000000a4'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
              >
                Nesouhlasím
                <img src="/ne.jpg" alt="plz" className={styles.headerImg} />
              </button>
              <button
                onClick={handleAcceptCookies}
                style={{
                  padding: '2vh',
                  fontSize: '2.5vh',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: '0.3s',
                  boxShadow: '5px 5px 12px #000000a4'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
              >
                Souhlasím
                <img src="/ano.jpg" alt="plz" className={styles.headerImg} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '60vh' }}>
        {(session && session.user?.email) ? (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ padding: '2rem' }}>
              <button onClick={() => signOut()}>Odhlásit</button>
            </div>
          </div>
        ) : (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#00559b46', padding: '10vw 5vw', width: '80vw', borderRadius: '30px', maxWidth: '67vh' }}>
              <h2 style={{ textAlign: 'center', fontSize: '5vh', fontWeight: 'bold', marginBottom: '2vh' }}>{isRegistering ? 'REGISTRACE' : 'PŘIHLÁŠENÍ'}</h2>

              {isRegistering && (
                <input
                  type="text"
                  placeholder="Jméno"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
              />

              <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <button onClick={handleSubmit}
                style={{
                  marginBottom: '2vh', backgroundColor: '#00000020', padding: '1vh 2vh', borderRadius: '12px', fontSize: '2.5vh', cursor: 'pointer', boxShadow: '3px 3px 10px #000000c0', minWidth: '30vh', display: 'block', margin: '0 auto 2vh auto'
                }}>
                {isRegistering ? 'REGISTROVAT' : 'PŘIHLÁSIT SE'}
              </button>

              <p style={{ fontSize: '2.3vh', marginTop: '5vh' }}>
                {isRegistering ? 'Už máš účet?' : 'Nemáš ještě účet?'}{' '}
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  style={{ textDecoration: 'underline', fontSize: '2.3vh', cursor: 'pointer' }}
                >
                  {isRegistering ? 'Přihlásit se' : 'Registrovat'}
                </button>
              </p>
            </div>
          </div>)}
      </main>
    </div>
  );
}