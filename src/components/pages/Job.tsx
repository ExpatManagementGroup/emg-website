import styles from './Job.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';
import Button from '../Button';
import Pill from '../Pill';

export default function Job( { blok }: { blok: any }) {
  return (
    <div className={styles.job} {...storyblokEditable(blok)}>
      <Button className={styles.backbutton} type="Link" href='/work-with-us' text="←" arrow='none' />
      <h1 className={styles.jobtitle}>{blok.jobtitle}</h1>
      <div className={styles.jobinfo}>
        <div className={styles.classification}>{blok.classification}</div>
        <div className={styles.team}>{blok.team}</div>
        <Pill className={styles.location}>{blok.location}</Pill>
      </div>
      <div className={styles.details}>
        <div className={styles.description}>
          {render(blok.description)}
        </div>
        <div className={styles.button}>
          <Button
            type="Link"
            href={blok.button_url}
            text={blok.button_text}
          />
        </div>
        <div className={styles.lists}>{render(blok.lists)}</div>
      </div>
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </div>
  )
}