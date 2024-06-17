import styles from './OurClientsFeed.module.css';
import Picture from '../Picture';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function OurClientsFeedCard( { props }: { props: any }) {
  return (
    <div className={`${styles.clientCard} ${styles.first}`}>
      <Picture
        src={props.logo?.filename}
        alt={props.logo?.alt}
        aspectRatioDesktop="2.398"
        aspectRatioMobile="2.398"
        className={styles.logo}
        noCrop={true}
      />
      <blockquote className={styles.quote}>
        <p>{props.quote.content}</p>
        <cite><span>{props.quote.name}</span> <span>{props.quote.jobtitle}</span></cite>
      </blockquote>
      <div className={styles.stats}>
        {props.stats.stats_1.number &&
          <div className={styles.stats_stat}>
            <Icon name="checkmark" />
            <div className={styles.stats_number}>{props.stats.stats_1.number}</div>
            <div className={styles.stats_title}>{props.stats.stats_1.title}</div>
          </div>
        }
        {!props.stats.stats_2.number &&
          <div className={styles.stats_stat}>
            <Icon name="checkmark" />
            <div className={styles.stats_number}>{props.stats.stats_2.number}</div>
            <div className={styles.stats_title}>{props.stats.stats_2.title}</div>
          </div>
        }
        {props.stats.stats_3.number &&
          <div className={styles.stats_stat}>
            <Icon name="checkmark" />
            <div className={styles.stats_number}>{props.stats.stats_3.number}</div>
            <div className={styles.stats_title}>{props.stats.stats_3.title}</div>
          </div>
        }
      </div>
      <div className={styles.button_wrapper}>
        <Button 
          type="Link" 
          href={props.full_slug} 
          text="See the full Case" 
          bgcolor='white'
          className={styles.button}
        />    
      </div>
  </div>
  )
}