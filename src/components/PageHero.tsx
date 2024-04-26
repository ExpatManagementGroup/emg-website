import styles from './PageHero.module.css';
import Picture from './Picture';
import { storyblokEditable } from '@storyblok/react';

export default function PageHero( { blok }: { blok: any }) {
  let layout = styles.left_aligned;
  if (blok.layout === 'center') {
    layout = styles.center_aligned;
  }

  return (
    <section className={styles.hero} {...storyblokEditable(blok)}>
      { blok.bgimg.filename && 
        <Picture
          src={blok.bgimg.filename}
          aspectRatioDesktop="2.012"
          aspectRatioMobile="0.843"
          alt={blok.bgimg.alt ? blok.bgimg.alt : 'an atmospheric background image'}
          sizes="100vw"
          className={styles.bgimg}
        />
      }
      <header className={`${styles.headline} ${layout}`}>
        <div className={styles.eyebrow}>{blok.eyebrow}</div>
        <h1 className={styles.title}>
          <span className={styles.normal}>{blok.headline_1}</span>
          <span className={styles.italic}>{blok.headline_2}</span>
        </h1>
      </header>
    </section>
  )
}