import styles from './CCTestimonial.module.css';
import Picture from '../Picture';
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CCTestimonial( { blok }: { blok: any }) {
  return (
    <div className={styles.testimonial} {...storyblokEditable(blok)}>
      <div className={styles.title}>{blok.title}</div>
      <div className={styles.image}>
        <Picture 
          src={blok.image.filename} 
          aspectRatioDesktop='0.83'
          aspectRatioMobile='0.58'
          alt={blok.image.alt}
          sizes='(min-width: 840px) 30vw, 95vw'
        />
      </div>
      <div className={styles.quote}>
        <div className={styles.quote_text}>
          {blok.quote}
        </div>
        <div className={styles.quote_name}>
          {blok.name}
        </div>
        <div className={styles.quote_jobtitle}>
          {blok.jobtitle}
        </div>
      </div>
    </div>
  )
}