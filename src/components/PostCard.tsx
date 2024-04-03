import styles from './PostCard.module.css'
import Image from 'next/image'
import Topic from './Topic'
import FormattedDate from './FormattedDate'
import Button from './Button'
import Link from 'next/link'

export default function PostCard(props: { 
    featured_image_url: string,
    featured_image_alt: string,
    description?: string,
    title: string,
    country: string,
    topic: string,
    date: string,
    slug: string,
    isFeature?: boolean
}) {

  if (props.isFeature) {
    return (
     <div className={`${styles.postcard} ${props.isFeature ? styles.postcard_featured : styles.postcard_regular}`}>
       <figure className={styles.featured_image}>
        <picture>
          <source 
            media="(min-width: 840px)" 
            srcSet={props.featured_image_url && `
              ${props.featured_image_url}/m/640x320/filters:format(webp) 640w, 
              ${props.featured_image_url}/m/750x375/filters:format(webp) 750w, 
              ${props.featured_image_url}/m/828x414/filters:format(webp) 828w, 
              ${props.featured_image_url}/m/1080x540/filters:format(webp) 1080w, 
              ${props.featured_image_url}/m/1200x600/filters:format(webp) 1200w, 
              ${props.featured_image_url}/m/1920x960/filters:format(webp) 1920w, 
            `} 
            sizes='70vw'
          />
          <source 
            media="(max-width: 839.9px)" 
            srcSet={props.featured_image_url && `
              ${props.featured_image_url}/m/320x446/filters:format(webp) 320w, 
              ${props.featured_image_url}/m/480x669/filters:format(webp) 480w, 
              ${props.featured_image_url}/m/640x892/filters:format(webp) 640w, 
              ${props.featured_image_url}/m/750x1044/filters:format(webp) 750w, 
              ${props.featured_image_url}/m/828x1153/filters:format(webp) 828w, 
              ${props.featured_image_url}/m/1080x1505/filters:format(webp) 1080w, 
              ${props.featured_image_url}/m/1200x1672/filters:format(webp) 1200w, 
            `} 
            sizes='95vw'
          />
          <img
            src={`${props.featured_image_url}/m/320x446/filters:format(jpg)`}
            alt={props.featured_image_alt}
            className={styles.featured_image_img}
          />
        </picture>
       </figure>
       <div className={styles.postcard_info}>
         <h2 className={styles.postcard_title}>{props.title}</h2>
         <div className={styles.header_meta}>
           <div className="pill">{props.country}</div>
           <Link href={`/insights/topics/${props.topic}`} >
              <div className="pill"><Topic name={props.topic}/></div>
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
          <picture>
            <source 
              media="(min-width: 840px)" 
              srcSet={props.featured_image_url && `
                ${props.featured_image_url}/m/640x360/filters:format(webp) 640w, 
                ${props.featured_image_url}/m/750x422/filters:format(webp) 750w, 
                ${props.featured_image_url}/m/828x466/filters:format(webp) 828w, 
                ${props.featured_image_url}/m/1080x608/filters:format(webp) 1080w, 
                ${props.featured_image_url}/m/1200x675/filters:format(webp) 1200w, 
                ${props.featured_image_url}/m/1920x1080/filters:format(webp) 1920w, 
              `} 
              sizes='20vw'
            />
            <source 
              media="(max-width: 839.9px)" 
              srcSet={props.featured_image_url && `
                ${props.featured_image_url}/m/640x360/filters:format(webp) 640w, 
                ${props.featured_image_url}/m/750x422/filters:format(webp) 750w, 
                ${props.featured_image_url}/m/828x466/filters:format(webp) 828w, 
                ${props.featured_image_url}/m/1080x608/filters:format(webp) 1080w, 
                ${props.featured_image_url}/m/1200x675/filters:format(webp) 1200w, 
                ${props.featured_image_url}/m/1920x1080/filters:format(webp) 1920w, 
              `} 
              sizes='95vw'
            />
            <img
              src={`${props.featured_image_url}/m/320x446/filters:format(jpg)`}
              alt={props.featured_image_alt}
              className={styles.featured_image_img}
            />
          </picture>
        </Link>
       </figure>
       <div className={styles.postcard_info}>
         <div className={styles.header_meta}>
           <div className="pill">{props.country}</div>
           <Link href={`/insights/topics/${props.topic}`} >
            <div className="pill"><Topic name={props.topic}/></div>
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