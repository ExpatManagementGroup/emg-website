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
  const quotelength = content?.quote?.length
  const quoteclass = quotelength > 180 ? styles.longquote : styles.shortquote
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
        <div className={`${styles.quote} ${quoteclass}`}>{content?.quote}</div>
        {content.logo &&
          <figure className={styles.logo}>
            <Picture 
              src={content.logo.filename}
              alt={content.logo.alt}
              noCrop={true}
              aspectRatioDesktop='3.7'
              aspectRatioMobile='3.2'
            />
          </figure>
        }
        {content.url && 
          <div className={styles.button}>
            <Button
              type='Link'
              href={content?.url}
              text='See the full Case'
            />
          </div>
        }
      </div>
    )
  }
}