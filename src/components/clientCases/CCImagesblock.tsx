import styles from './CCImagesblock.module.css';
import Picture from '../Picture';
import { storyblokEditable } from '@storyblok/react';

export default function CCImagesblock( { blok }: { blok: any }) {
  return (
    <div className={styles.images} {...storyblokEditable(blok)}>
      {blok.image_1.filename &&
        <Picture
          src={blok.image_1.filename}
          alt={blok.image_1.alt}
          className={styles.image_1}
          aspectRatioDesktop='1.7811158798'
          aspectRatioMobile='0.9372937294'
          sizes='(min-width: 840px) 50vw, 67vw'
        />
      }
      {blok.image_2.filename &&
        <Picture
          src={blok.image_2.filename}
          alt={blok.image_2.alt}
          className={styles.image_2}
          aspectRatioDesktop='1.2660944206'
          aspectRatioMobile='0.3531353135'
          sizes='(min-width: 840px) 36vw, 25vw'
        />
      }
    </div>
  )
}