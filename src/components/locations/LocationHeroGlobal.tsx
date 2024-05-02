import styles from './LocationHero.module.css';
import Picture from '../Picture';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Flag from '../ui/Flag';
import {render} from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function LocationHeroGlobal( { blok }: { blok: any }) {
  const variantclass = blok.variant === 'global' ? styles.global : styles.country;
  return (
    <section className={`${styles.hero} ${styles.hero_global}`} {...storyblokEditable(blok)}>
      <Picture
        src={blok.image.filename}
        alt={blok.image.alt}
        className={styles.image}
        aspectRatioDesktop='0.841733871'
        aspectRatioMobile='1.2482582443'
        sizes='(min-width: 840px) 50vw, 100vw'
      />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.greeting}>{blok.title_greeting}</span>
          <span className={styles.country}>{blok.title_country}</span>
        </h1>
        <div className={styles.cta}>
          <Icon name='global' />
        </div>
        <div className={styles.intro}>{render(blok.intro)}</div>
      </div>
    </section>
  )
}