import styles from './PageTextblock.module.css';
import Button from './ui/Button';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';

export default function PageTextblock( { blok }: { blok: any }) {

  let classList = styles.pagetextblock;
  if (blok.text_align) {
    const align = blok.text_align;
    if (align === 'left') {
      classList = classList + ' --alignLeft';
    }
    if (align === 'right') {
      classList = classList + ' --alignRight';
    }
    if (align === 'center') {
      classList = classList + ' --alignCenter';
    }
  }
  if (blok.fontsize) {
    classList = classList + ' fontsize-' + blok.fontsize;
  }
  else {
    classList = classList + ' fontsize-m';
  }

  return (
    <div className={classList} {...storyblokEditable(blok)}>
      <div className={styles.richtext}>
        {render(blok.content)}
      </div>
      <div className={styles.buttons}>
        { blok.button_primary_text &&
          <Button
            type="Link"
            href={blok.button_primary_url || '/'}
            text={blok.button_primary_text}
            className={styles.button_primary}
          />
        }
        { blok.button_secondary_text &&
          <Button
            type="Link"
            href={blok.button_secondary_url || '/'}
            text={blok.button_secondary_text}
            className={styles.button_secondary}
            bgcolor='deep-teal'
          />
        }
      </div>
    </div>
  )
}