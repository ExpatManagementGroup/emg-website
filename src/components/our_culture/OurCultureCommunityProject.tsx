import styles from './OurCultureCommunityProject.module.css';
import {render} from 'storyblok-rich-text-react-renderer';
import Picture from '../Picture';

export default function OurCultureCommunityProject( { props }: { props: any }) {
  return (
    <div className={styles.project}>
      <Picture
        src={props.image.filename}
        alt={props.image.alt}
        aspectRatioDesktop='0.9278688525'
        aspectRatioMobile='0.9278688525'
        sizes='(min-width: 840px) 34vw, 87vw'
        className={styles.picture}
      />
      <div className={styles.text}>
        <h3 className={styles.name}>{props.name}</h3>
        <div className={styles.description}>{render(props.description)}</div>
        { props.quote && 
          <blockquote className={styles.quote}>
            {props.quote}
            <cite className={styles.cite}>{props.quote_author}</cite>
          </blockquote>
        }
      </div>
      
    </div>
  )
}