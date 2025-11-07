'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../Home.module.css';

export default function Teorie() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ve vývoji</h1>
    </div>
  );
}
