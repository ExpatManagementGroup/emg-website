import styles from './OurStoryJourney.module.css';
import { storyblokEditable } from "@storyblok/react";
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export default function OurStoryJourney( { blok }: { blok: any }) {
  return (
    <>
      <section className={styles.journey} {...storyblokEditable(blok)}>
        <div className={styles.journey_intro}>
          <h2 className={styles.title}>{blok.title}</h2>
          <p className={styles.subtitle}>{blok.subtitle}</p>
        </div>
        <div className={styles.journey_steps}>
          {blok.journey_steps.map((step: any) => (
            <StoryblokServerComponent blok={step} key={step._uid} />
          ))}
        </div>
      </section>
    </>
  )
}