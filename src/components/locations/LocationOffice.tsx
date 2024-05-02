import { render } from 'storyblok-rich-text-react-renderer';
import styles from './LocationOffice.module.css';
import Icon from '../ui/Icon';
import Picture from '../Picture';
import Link from 'next/link';

export default function LocationOffice( { blok }: { blok: any }) {
  return (
    <section className={styles.office}>
      <div className={styles.content}>
        <h1 className={styles.title}>{blok.title}</h1>
        <div className={styles.description}>{render(blok.description)}</div>
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
      <div className={styles.office_images}>
        { blok.image.filename && 
          <Picture
            src={blok.image?.filename}
            alt={blok.image?.alt}
            className={styles.image}
            aspectRatioDesktop='0.89375'
            aspectRatioMobile='1'
            sizes='(min-width: 840px) 43vw, 91vw'
          />
        }
        { blok.image.filename && blok.map_image?.filename &&
          <Link href={blok.map_href}>
            <Picture
              src={blok.map_image?.filename}
              alt={blok.map_image?.alt}
              className={styles.map_image}
              aspectRatioDesktop='1.2689393939'
              aspectRatioMobile='1.8585858586'
              sizes='(min-width: 840px) 29vw, 43vw'
            />
          </Link>
        }
      </div>
    </section>
  )
}