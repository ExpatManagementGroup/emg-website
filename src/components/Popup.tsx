'use client';
import styles from './Popup.module.css';
import NewsletterFormShort from './NewsletterFormShort';
import { useEffect, useState } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function Popup( props: {
  delay?: number,
  headline?: string
}) {
  const delay = props.delay || 1000;
  
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("emgNewsletterSeen", "true");
  }

  useEffect(() => {
    if (!sessionStorage.getItem("emgNewsletterSeen")){
      console.log("Popup will open in " + delay + "ms");
      setTimeout(() => {
        setOpen(true);
      }, delay)
    } 
    else {
      console.log("SessionStorage set: " + sessionStorage.getItem("emgNewsletterSeen") );
    }
  }, [delay])

  if (open) {
    return (
      <div className={styles.popup}>
        <svg onClick={close} className={styles.close} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.1 2.93C21.01 6.84 21.01 13.18 17.1 17.1C13.19 21.01 6.85 21.01 2.93 17.1C-0.980002 13.19 -0.980002 6.85 2.93 2.93C6.84 -0.980002 13.18 -0.980002 17.1 2.93Z" className={styles.close_bg} />
          <path d="M6.13 13.91L13.91 6.13" className={styles.close_stroke} />
          <path d="M6.13 6.13L13.91 13.91" className={styles.close_stroke} />
        </svg>
        <div className={styles.headline}>{render(props.headline)}</div>
        <NewsletterFormShort formid="popup" />
      </div>
    )
  }
  else {
    return null
  }
}