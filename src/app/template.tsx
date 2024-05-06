'use client';
import { useEffect } from "react"
import styles from './template.module.css';

export default function Template({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const videos = document.querySelectorAll('div');
    console.log('videos', videos);
  }, [])

  return <div className={styles.transition}>{children}</div>
}