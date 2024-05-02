import styles from './LocationServicesService.module.css';
import { storyblokEditable } from '@storyblok/react';
import Picture from '../Picture';
import Plus from '../ui/Plus';
import { render } from 'storyblok-rich-text-react-renderer';
import { useState, useEffect, useRef } from 'react';

export default function LocationServicesService( { props }: { props: any }) {

  const [open, setOpen] = useState(false);
  const service = useRef(null);

  useEffect(() => {
    if (service.current) {
      const thisservice = service.current as HTMLElement,
            toggler = thisservice.querySelector(`.${styles.content}`);
      
      const getTogglerHeight = () => {
        if (!toggler) return 0;
        return toggler?.scrollHeight + 1;
      }

      thisservice.style.setProperty('--service-height', `${getTogglerHeight()}px`);
      
      window.addEventListener('resize', () => {
        thisservice.style.setProperty('--service-height', `${getTogglerHeight()}px`);
      })
    } 
  });

  return (
    <div className={styles.service} {...storyblokEditable(props)} onClick={() => setOpen(!open)} ref={service}>
      <Picture
        src={props.icon.filename}
        alt={props.icon.alt}
        className={styles.icon}
        aspectRatioDesktop='1'
        aspectRatioMobile='1'
        sizes='(min-width: 840px) 7vw, 21vw'
        noCrop={true}
      />
      <h2 className={styles.name}>{props.name}</h2>
      <div className={styles.content} data-hidden={!open}>
        <div className={styles.content_inner}>
          {render(props.content)}
        </div>
      </div>
      <Plus className={`${styles.plus} ${open ? styles.open : styles.closed}`} state={open} />
    </div>
  )
}