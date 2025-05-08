'use client';
import styles from './template.module.css';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.transition}>
      <ScrollToTop />
      {children}
    </div>
  )
}