import styles from './HomeMembers.module.css';
import Picture from '../Picture';

export default function HomeMembers( { blok }: { blok: any }) {
  return (
    <section className={styles.home_members}>
      <h2 className={styles.title}>{blok.title}</h2>
      <div className={styles.logos}>
        {blok.logos.map((logo: any, index: number) => {
          return (
            <Picture
              key={`logo-${index}`}
              src={logo.filename}
              alt={logo.alt}
              aspectRatioDesktop="3.137"
              aspectRatioMobile="3.137"
              sizes="(min-width:840px) 11vw, 25vw"
              className={styles.logo}
            />
          )
        })}
      </div>
    </section>
  )
}