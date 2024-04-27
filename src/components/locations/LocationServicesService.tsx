import styles from './LocationServicesService.module.css';
import { storyblokEditable } from '@storyblok/react';
import Picture from '../Picture';
import Plus from '../Plus';
import { render } from 'storyblok-rich-text-react-renderer';
import { useState } from 'react';

export default function LocationServicesService( { props }: { props: any }) {

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.service} {...storyblokEditable(props)} onClick={() => setOpen(!open)}>
      <Picture
        src={props.icon.filename}
        alt={props.icon.alt}
        className={styles.icon}
        aspectRatioDesktop='1'
        aspectRatioMobile='1'
        sizes='(min-width: 840px) 7vw, 21vw'
      />
      {props.name}
      <Plus className={styles.plus} state={open} />
      <div className={styles.content} data-hidden={open}>
        {render(props.content)}
      </div>
    </div>
  )
}