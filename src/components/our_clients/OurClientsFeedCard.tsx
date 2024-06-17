import styles from './OurClientsFeed.module.css';
import Picture from '../Picture';
import Button from '../ui/Button';

export default function OurClientsFeedCard( { props }: { props: any }) {
  return (
    <div className={`${styles.clientCard} ${styles.nonfirst}`}>
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
      <div className={styles.button_wrapper}>
        <Button 
          type="Link" 
          href={props.full_slug} 
          text="See the full Case" 
          className={styles.button}
        />    
      </div>
  </div>
  )
}