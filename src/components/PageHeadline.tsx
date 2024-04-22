import styles from './PageHeadline.module.css';
import { storyblokEditable } from '@storyblok/react';

export default function PageHeadline( { blok }: { blok: any }) {
  return (
    <header className={styles.pageheadline} {...storyblokEditable(blok)}>
      <div className={styles.eyebrow}>{blok.eyebrow}</div>
      <h1 className={styles.headline}>
        <span className={styles.normal}>{blok.headline_1}</span>
        <span className={styles.italic}>{blok.headline_2}</span>
      </h1>
    </header>
  )
}