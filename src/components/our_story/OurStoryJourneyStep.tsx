import styles from './OurStoryJourneyStep.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from "@storyblok/react";


export default function OurStoryJourneyStep( { blok }: { blok: any }) {
  return (
    <div className={styles.step} {...storyblokEditable(blok)}>
      <div className={styles.date}>{blok.date}</div>
      <div className={styles.text}>{render(blok.text)}</div>
    </div>
  )
}