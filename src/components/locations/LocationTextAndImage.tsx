import styles from './LocationTextAndImage.module.css';
import Picture from '../Picture';
import Button from '../ui/Button';
import {render} from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function LocationTextAndImage( { blok }: { blok: any }) {
  return (
    <section className={styles.textAndImage} {...storyblokEditable(blok)}>
      <div className={styles.textcol}>
        {render(blok.richtext, {
            blokResolvers: {
                ['richtext_button']: (props: any) => <Button type="Link" href={props.url} text={props.text} className={styles.button} />
            }
        })}
      </div>
      <div className={styles.imagecol}>
        <Picture
          src={blok.image.filename}
          alt={blok.image.alt}
          className={styles.picture}
          aspectRatioDesktop='1.1330698287'
          aspectRatioMobile='1'
          sizes='(min-width: 840px) 52vw, 91vw'
        />
      </div>
    </section>
  )
}