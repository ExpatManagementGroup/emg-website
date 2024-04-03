import styles from './CCAbout.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import Icon from '../Icon';
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CCAbout( { blok }: { blok: any }) {
  return (
    <div className={styles.about} {...storyblokEditable(blok)}>
      <div className={styles.content}>
        <h2>{blok.title}</h2>
        <div className={styles.content_richtext}>
          {render(blok.content)}
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stats_1}>
          <Icon name="checkmark-orange" />
          <div className={styles.stats_number}>{blok.stats_1_number}</div>
          <div className={styles.stats_title}>{blok.stats_1_title}</div>
        </div>
        <div className={styles.stats_2}>
          <Icon name="checkmark-orange" />
          <div className={styles.stats_number}>{blok.stats_2_number}</div>
          <div className={styles.stats_title}>{blok.stats_2_title}</div>
        </div>
        <div className={styles.stats_3}>
          <Icon name="checkmark-orange" />
          <div className={styles.stats_number}>{blok.stats_3_number}</div>
          <div className={styles.stats_title}>{blok.stats_3_title}</div>
        </div>
      </div>
    </div>
  )
}