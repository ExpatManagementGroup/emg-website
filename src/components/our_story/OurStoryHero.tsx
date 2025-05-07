import styles from './OurStoryHero.module.css';
import { storyblokEditable } from '@storyblok/react';

export default function OurStoryHero( { blok }: { blok: any }) {
  return (
    <section className={styles.hero} {...storyblokEditable(blok)}>
      <h1 className={styles.title}>
        <span className={styles.regular}>{blok.title_1}</span>
        <span className={styles.italic}>{blok.title_2}</span>
      </h1>
    </section>
  )
}