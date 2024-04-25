import styles from './OurCultureCommunity.module.css';
import OurCultureCommunityProject from './OurCultureCommunityProject';
import { storyblokEditable } from '@storyblok/react';

export default function OurCultureCommunity( { blok }: { blok: any }) {
  return (
    <section className={styles.community} {...storyblokEditable(blok)}>
      <h2 className={styles.title}>{blok.title}</h2>
      <div className={styles.projects}>
        {blok.projects.map((project: any, index: number) => (
          <div className={styles.project} key={`community-project-${index}`}>
            <OurCultureCommunityProject props={project} />
          </div>
        ))}
      </div>
    </section>
  )
}