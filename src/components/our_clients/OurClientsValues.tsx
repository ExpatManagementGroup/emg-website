import styles from './OurClientsValues.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';
import Icon from '../ui/Icon';

export default function OurClientsValues( { blok }: { blok: any }) {
  return (
    <section className={styles.values_wrapper} {...storyblokEditable(blok)}>
      <div className={styles.header}>
        <div className={styles.header_text}>
          {render(blok.header)}
        </div>
        <div className={styles.header_icon}>
          <Icon name="certified" className={styles.icon} />
        </div>
      </div>
      <div className={styles.values}>
        {render(blok.values)}
      </div>
    </section>
  )
}