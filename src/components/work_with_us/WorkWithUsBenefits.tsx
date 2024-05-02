import styles from './WorkWithUsBenefits.module.css';
import Picture from '../Picture';
import FAQ from '../ui/FAQModule';
import { storyblokEditable } from '@storyblok/react';

export default function WorkWithUsBenefits( { blok }: { blok: any }) {
  return (
    <div className={styles.benefits} {...storyblokEditable(blok)}>
      <Picture
        src={blok.image.filename}
        alt={blok.image.alt}
        aspectRatioDesktop='0.7341628959'
        aspectRatioMobile='0.7341628959'
        sizes='(min-width: 840px) 39vw, 86vw'
        className={styles.image}
      />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{blok.title_eyebrow}</p>
        <h2 className={styles.headline}>{blok.title_headline}</h2>
        <div className={styles.benefits_list}>
          { blok.benefits.map((benefit: any, index: number) => (
            <FAQ props={benefit} key={`benefit_${index}`} />
          ))}
        </div>
      </div>
    </div>
        // <pre>{JSON.stringify(blok.benefits, null, 2)}</pre>
  )
}