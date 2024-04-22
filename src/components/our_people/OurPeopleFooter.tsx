import styles from './OurPeopleFooter.module.css';
import Button from '../Button';
import { storyblokEditable } from '@storyblok/react';

export default function OurPeopleFooter( { blok }: { blok: any }) {
  return (
    <section className={`peoplefooter ${styles.peoplefooter}`} {...storyblokEditable(blok)}>
      <div className={styles.box}>
        <h2 className={styles.headline}>
          {blok.headline}
        </h2>
        <p className={styles.subhead}>{blok.subhead}</p>
        <Button 
          type="Link"
          href={blok.button_url}
          text={blok.button_text}
          arrow="right"
          className={styles.button}
        />
      </div>
    </section>
  )
}