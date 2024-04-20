import styles from './PageQuote.module.css';
import Picture from './Picture';
import { storyblokEditable } from '@storyblok/react';

export default function PageQuote( { blok }: { blok: any }) {
  return (
    <div className={styles.quote} {...storyblokEditable(blok)}>
      <blockquote className={styles.blockquote}>
        <p className={styles.quote_text}>{blok.quote}</p>
        <footer className={styles.quote_author}>
          <cite>{blok.quote_name}</cite>
          <Picture
            src={blok.quote_logo.filename}
            aspectRatioDesktop="3.191"
            aspectRatioMobile="3.191"
            alt={blok.quote_logo.alt ? blok.quote_logo.alt : 'company logo'}
            sizes="(min-width: 840px) 9vw, 15vw"
            className={styles.quote_logo}
          />
        </footer>
      </blockquote>
    </div>
  )
}