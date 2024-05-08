import styles from './CCTextblock.module.css';
import { storyblokEditable } from '@storyblok/react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function CCTextblock( { blok }: { blok: any }) {

  const layout = blok.layout;
  const classNames = [styles.textblock, styles[layout]].join(' ');

  return (
    <div className={classNames} {...storyblokEditable(blok)}>
      {render(blok.richtext)}
    </div>
  )
}