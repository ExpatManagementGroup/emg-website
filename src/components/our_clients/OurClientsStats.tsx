import styles from './OurClientsStats.module.css';
import { storyblokEditable } from '@storyblok/react';

export default function OurClientsStats( { blok }: { blok: any }) {
  return (
    <section className={styles.stats} {...storyblokEditable(blok)}>
      <div className={styles.row}>
        <div className={styles.immigrations}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.immigrations}</span>
            <span className={styles.label}>Immigrations <br />or Relocations</span>
          </div>
        </div>
        <div className={styles.clients}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.clients}</span>
            <span className={styles.label}>Beloved <br />Clients</span>
          </div>
        </div>
        <div className={styles.years}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.years}</span>
            <span className={styles.label}>Years in <br />Operation</span>
          </div>
        </div>
      </div>
    </section>
  )
}