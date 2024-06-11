import styles from './CCClientSlide.module.css';
import Picture from '../Picture';
import Image from 'next/image';
import Button from '../ui/Button';

export default function CCClientSlide( props: {
  slideContent: {
    image: {
      filename: string,
      alt: string
    },
    name: string,
    jobtitle: string,
    quote: string,
    logo: {
      filename: string,
      alt: string
    },
    url: string
  }
}) {
  const content = props.slideContent
  if (!content) {
    return (
      <div className={styles.client_slide}>
        <pre>{JSON.stringify(props)}</pre>
      </div>
    )
  } else {
    return (
      <div className={styles.client_slide}>
        <div className={styles.quotationmark}>“</div>
        {/* <Picture
          className={styles.image}
          src={content?.image?.filename}
          aspectRatioDesktop='0.74'
          aspectRatioMobile='0.74'
          alt={content?.image?.alt}
          sizes='(min-width: 840px) 3vw, 12vw'
        /> */}
        <div className={styles.quote}>{content?.quote}</div>
        <figure className={styles.logo}>
          <Image 
            src={content?.logo?.filename}
            alt={content?.logo?.alt}
            fill={true}
          />
        </figure>
        <div className={styles.button}>
          <Button
            type='Link'
            href={content?.url}
            text='See the full Case'
          />
        </div>
      </div>
    )
  }
}