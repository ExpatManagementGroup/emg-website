import styles from './FAQHero.module.css';
import {render} from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function FAQHeader( { blok }: { blok: any }) {
  return (
    <section className={styles.hero} {...storyblokEditable(blok)}>
      <h1 className={styles.headline}>{blok.headline}</h1>
      <div className={styles.intro}>
        {render(blok.intro)}
      </div>
    </section>
  )
}