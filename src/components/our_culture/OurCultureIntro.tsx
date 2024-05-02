import styles from './OurCultureIntro.module.css';
import {render} from 'storyblok-rich-text-react-renderer';
import Button from '../ui/Button';
import { storyblokEditable } from '@storyblok/react';

export default function OurCultureIntro( { blok }: { blok: any }) {
  return (
    <section className={styles.intro} {...storyblokEditable(blok)}>
      <div className={styles.content}>{render(blok.content)}</div>
      { blok.button_text && blok.button_url &&
        <Button
          href={blok.button_url}
          text={blok.button_text}
          type='Link'
          bgcolor='white'
        />
      }
    </section>
  )
}