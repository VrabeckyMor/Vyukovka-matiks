import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn}>O NÁS</button>
        <button className={styles.btn}>JAK NA TO</button>
        <button className={styles.btn}>PŘÍKLADY</button>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.title}>tady jsem myslel že by se vždy objevilo to z něco z toho menu vlevo</h1>
      </main>
    </div>
  );
}