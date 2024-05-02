import styles from './PageRelocationMoreCountries.module.css';
import {render} from 'storyblok-rich-text-react-renderer';
import Flag from './ui/Flag';
import Button from './ui/Button';
import { storyblokEditable } from '@storyblok/react';

export default function PageRelocationMoreCountries( { blok }: { blok: any }) {
  return (
    <section className={styles.learn_more} {...storyblokEditable(blok)}>
      <div className={styles.intro}>{render(blok.intro)}</div>
      <div className={styles.countries}>
        <div className={styles.country}>
          <h3 className={styles.country_name}>The Netherlands</h3>
          <Flag country='nl' className={styles.country_flag} />
          <Button
            type='Link'
            href='/netherlands'
            text='Show me more'
            className={styles.button}
            bgcolor='transparent'
          />
        </div>
        <div className={styles.country}>
          <h3 className={styles.country_name}>Luxembourg</h3>
          <Flag country='lu' className={styles.country_flag} />
          <Button
            type='Link'
            href='/luxembourg'
            text='Show me more'
            className={styles.button}
            bgcolor='transparent'
          />
        </div>
        <div className={styles.country}>
          <h3 className={styles.country_name}>Germany</h3>
          <Flag country='de' className={styles.country_flag} />
          <Button
            type='Link'
            href='/germany'
            text='Show me more'
            className={styles.button}
            bgcolor='transparent'
          />
        </div>
        <div className={styles.country}>
          <h3 className={styles.country_name}>Belgium</h3>
          <Flag country='be' className={styles.country_flag} />
          <Button
            type='Link'
            href='/belgium'
            text='Show me more'
            className={styles.button}
            bgcolor='transparent'
          />
        </div>
      </div>
    </section>
  )
}