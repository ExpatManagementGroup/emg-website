import styles from './LocationHero.module.css';
import Picture from '../Picture';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Flag from '../ui/Flag';
import {render} from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function LocationHero( { blok }: { blok: any }) {
  const variantclass = blok.variant === 'global' ? styles.global : styles.country;

  const hashlink = () => {
    if (blok.flag === 'LU' || blok.flag === 'BE') {
      return `belux`
    }
    else if (blok.flag) {
      return `${blok.flag}`
    }
    else {
      return ''
    }
  }

  const getReachOutLinkURL = () => {
    if (blok.reach_out_link && blok.reach_out_link.url) {
      return blok.reach_out_link.url;
    }
    else if (blok.reach_out_link && blok.reach_out_link.cached_url) {
      if (blok.reach_out_link.anchor) {
        return blok.reach_out_link.cached_url + `#${blok.reach_out_link.anchor}`;
      } 
      else {
        return blok.reach_out_link.cached_url;
      }
    }
    else {
      return `/contact-us#${hashlink()}`;
    }
  }

  return (
    <section className={styles.hero} {...storyblokEditable(blok)}>
      <Picture
        src={blok.image.filename}
        alt={blok.image.alt}
        className={styles.image}
        aspectRatioDesktop='0.841733871'
        aspectRatioMobile='1.2482582443'
        sizes='(min-width: 840px) 50vw, 100vw'
        priority={true}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.greeting}>{blok.title_greeting}</span>
          <span className={styles.country}>{blok.title_country}</span>
        </h1>
        <div className={styles.cta}>
          {blok.flag &&
            <Flag country={blok.flag} className={styles.flag} />
          }
          <Button
            type="Link"
            href={getReachOutLinkURL()}
            text='Reach Out'
            className={styles.button}
          />
        </div>
        <div className={styles.intro}>{render(blok.intro)}</div>
        <div className={styles.facts}>
          <div className={styles.fact}>
            <Icon name='checkmark-orange' className={styles.icon} />
            {blok.fact_1}
          </div>
          <div className={styles.fact}>
            <Icon name='checkmark-orange' className={styles.icon} />
            {blok.fact_2}
          </div>
          <div className={styles.fact}>
            <Icon name='checkmark-orange' className={styles.icon} />
            {blok.fact_3}
          </div>
        </div>
      </div>
    </section>
  )
}