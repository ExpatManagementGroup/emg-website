import styles from './CCTalent.module.css';
import Picture from '../Picture';
import ReactCountryFlag from 'react-country-flag';

export default function CCTalent( props:{
  slideContent: {
    client_name: string,
    from: string,
    to: string,
    client_logo: {
      filename: string,
      alt: string
    },
    client_quote: string,
    client_bgimage: {
      filename: string,
      alt: string
    }
  }
} ) {
  const t = props.slideContent
  return (
            <div className={styles.talenttestimonial}>
              <div className={styles.grid}>
                <div className={styles.name}>
                  {t.client_name}
                </div>
                <div className={styles.fromTo}>
                  <ReactCountryFlag 
                    countryCode={t.from} 
                    svg
                  />
                  <span className={styles.arrow}>→</span>
                  <ReactCountryFlag 
                    countryCode={t.to} 
                    svg
                  />
                </div>
                {
                  t.client_logo?.filename && (
                    <picture className={styles.logo} >
                      <img
                        src={t.client_logo.filename}
                        alt={t.client_logo.alt}
                      />
                    </picture>
                  )
                }
                <div className={styles.quote}>
                  {t.client_quote}
                </div>
              </div>
              {
                t.client_bgimage?.filename && (
                  <Picture
                    src={t.client_bgimage.filename}
                    alt={t.client_bgimage.alt}
                    aspectRatioDesktop='1.730'
                    aspectRatioMobile='1.730'
                    sizes='(min-width: 840px) 30vw, 95vw'
                    className={styles.bgimage}
                  />
                )
              }
            </div>
          )
}