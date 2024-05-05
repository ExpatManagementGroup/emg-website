import styles from './PostCard.module.css'
import FormattedDate from './ui/FormattedDate'
import Button from './ui/Button'
import Link from 'next/link'
import Pill from './ui/Pill'
import Picture from './Picture'

export default function PostCard(props: { 
    featured_image_url: string,
    featured_image_alt: string,
    description?: string,
    title: string,
    country: string,
    topicSlug: string,
    topicName: string,
    date: string,
    slug: string,
    isFeature?: boolean,
    reading_time?: string
}) {

  if (props.isFeature) {
    return (
     <div className={`${styles.postcard} ${props.isFeature ? styles.postcard_featured : styles.postcard_regular}`}>
       <figure className={styles.featured_image}>
        <Picture
          src={props.featured_image_url}
          aspectRatioDesktop="2"
          aspectRatioMobile="0.7174887892"
          alt={props.featured_image_alt}
          sizes="(min-width:840px) 50vw, 100vw"
          className={styles.featured_image_img}
        />
       </figure>
       <div className={styles.postcard_info}>
         <h2 className={styles.postcard_title}>{props.title}</h2>
         <div className={styles.header_meta}>
            { props.reading_time &&
              <Pill bgcolor="var(--EMG-Deep-Teal)" color="var(--EMG-White)" className={styles.readingtime}>{props.reading_time} min</Pill>
            }
           <Pill>{props.country}</Pill>
           <Link href={`/insights/topics/${props.topicSlug}`} >
              <Pill>{props.topicName}</Pill>
           </Link>
           <div className={styles.date}>
             <FormattedDate date={props.date} />
           </div>
         </div>
          <div className={styles.postcard_description}>
            {props.description}
          </div>
         <Button type="Link" href={`/insights/${props.slug}`} text="Read more" />
       </div>
     </div>
    )
  }
  if (!props.isFeature) {
    return (
     <div className={`${styles.postcard} ${props.isFeature ? styles.postcard_featured : styles.postcard_regular}`}>
       <figure className={styles.featured_image}>
        <Link href={`/insights/${props.slug}`} >
          <Picture
            src={props.featured_image_url}
            aspectRatioDesktop="1.7777777778"
            aspectRatioMobile="1.7777777778"
            alt={props.featured_image_alt}
            sizes="(min-width:840px) 50vw, 100vw"
            className={styles.featured_image_img}
          />
        </Link>
       </figure>
       <div className={styles.postcard_info}>
         <div className={styles.header_meta}>
           <Pill>{props.country}</Pill>
           <Link href={`/insights/topics/${props.topicSlug}`} >
            <Pill>{props.topicName}</Pill>
           </Link>
           <div className={styles.date}>
             <FormattedDate date={props.date} />
           </div>
         </div>
         <h2 className={styles.postcard_title}><Link href={`/insights/${props.slug}`}>{props.title}</Link></h2>
         <Button type="Link" href={`/insights/${props.slug}`} text="Read more" bgcolor='transparent' />
       </div>
     </div>
    )
  }

}