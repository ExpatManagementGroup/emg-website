import styles from './FAQHero.module.css';
import {render} from 'storyblok-rich-text-react-renderer';

export default function FAQHeader( { blok }: { blok: any }) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>{blok.headline}</h1>
      <div className={styles.intro}>
        {render(blok.intro)}
      </div>
    </section>
  )
}