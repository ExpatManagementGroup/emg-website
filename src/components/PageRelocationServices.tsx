import styles from './PageRelocationServices.module.css';
import {render} from 'storyblok-rich-text-react-renderer';
import FAQ from './ui/FAQModule';
import Picture from './Picture';
import { storyblokEditable } from '@storyblok/react';

export default function PageRelocationServices( { blok }: { blok: any }) {
  return (
    <div className={styles.services} {...storyblokEditable(blok)}>
      <div className={styles.intro}>
        <Picture
          src={blok.icon.filename}
          alt={blok.icon.alt}
          className={styles.icon}
          aspectRatioDesktop='1'
          aspectRatioMobile='1'
        />
        <h2 className={styles.title}>{blok.title}</h2>
        {render(blok.intro)}
      </div>
      <div className={styles.expandables}>
        {blok.expandables.map((expandable: any, index: number) => (
          <FAQ key={index} props={expandable} />
        ))}
      </div>
    </div>
  )
}