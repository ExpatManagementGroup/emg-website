import styles from './HomeClientLogos.module.css';
import CCOtherCases from "../clientCases/CCOtherCases"
import { storyblokEditable } from "@storyblok/react/rsc";

export default function HomeClientLogos( { blok }: { blok: any }) {
  const clientData = blok.clientCaseStories;

  return (
    <section className={styles.clientLogos} {...storyblokEditable(blok)} key={blok._uid}>
      <CCOtherCases stories={clientData} title={blok.title || ''} />
    </section>
  )
}