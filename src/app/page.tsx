'use client';

import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [sepExpanded, setSepExpanded] = useState(false);

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
        <h1 className={styles.title}>
          Vítejte!
        </h1>
        <h2 className={styles.title} style={{ width: '70vw', textAlign: 'justify' }}>
          Toto je úvodní stránka výukové aplikace pro žáky základních škol zaměřená na matematiku. Prosím, klikněte na tlačítko LOG IN a přihlašte se vaším učitelským či žákovským účtem pro další postup.
        </h2>
        <button className={styles.btn} style={{ margin: '2vh auto' }} onClick={() => router.push("/onas")}>LOG IN</button>
      </main>
    </div>
  );
}