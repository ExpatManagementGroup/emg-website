import styles from './PageImmigrationServices.module.css';
import Picture from './Picture';
import { storyblokEditable } from '@storyblok/react';

export default function PageImmigrationServices( { blok }: { blok: any }) {

  return (
    <section className={styles.immigration_services} {...storyblokEditable(blok)}>
      {blok.service_items.map((service: any, index: number) => {
        return (
          <div key={`service-${index}`} className={styles.service}>
            <Picture
              src={service.icon.filename}
              alt={service.icon.alt}
              className={styles.service_icon}
              aspectRatioDesktop='1'
              aspectRatioMobile='1'
              noCrop={true}
              sizes='(min-width: 840px) 7vw, 16vw'
            />
            <h3 className={styles.service_name}>{service.name}</h3>
          </div>
        )
      })}
    </section>
  )
}