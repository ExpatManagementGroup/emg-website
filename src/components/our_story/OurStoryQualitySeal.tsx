
import styles from './OurStoryQualitySeal.module.css';
import Picture from '../Picture';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function OurStoryQualitySeal( { blok }: { blok: any }) {
  return (
    <section className={styles.qualitySeal} {...storyblokEditable(blok)}>
      <div className={styles.renderedText}>
        {render(blok.richtext)}
      </div>
      <div className={styles.logos}>
        {/* <pre>this:{JSON.stringify(blok, null, 2)}</pre> */}
        {blok.logos.map((logo: any, index: number) => (
          <Picture
            key={logo.filename}
            className={styles.logo}
            src={logo.filename}
            sizes="(min-width:840px) 14vw, 50vw"
            aspectRatioDesktop='1'
            aspectRatioMobile='1'
            alt={logo.filename}
          />
        ))}
      </div>
    </section>
  )
}