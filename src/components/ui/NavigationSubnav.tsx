'use client'
import { useState, useRef } from 'react'
import styles from './NavigationSubnav.module.css'

export default function Subnav(props: any) {
  
  const toggle = useRef() as any

  const [subShown, setSubShown] = useState(false)
  
  function clickHandler() {
    setSubShown(!subShown)
    document.querySelector('[data-subnav-open]')?.setAttribute('data-subnav-open', subShown ? 'false' : 'true')

    const outsideClickListener = function(event: MouseEvent) {
      const outsideClick = !toggle.current.contains(event.target);
      if (outsideClick) {
        setSubShown(false);
        setTimeout(() => { 
          // Wait for the click event to finish before checking if there are any other subnavs open
          if (!document.querySelector('[data-show-subnav="true"]')) {
            document.querySelector('[data-subnav-open]')?.setAttribute('data-subnav-open','false')
          }
        }, 10)
        document.removeEventListener('click', outsideClickListener);
      }
    };
    document.addEventListener('click', outsideClickListener);
  }

  return(
    <div className={`${styles.subnav} ${props.className}`} data-show-subnav={subShown}>
      <div className={`${styles.subnav_toggle} navigation_item`} ref={toggle} onClick={clickHandler} aria-label="Toggle links">
        {props.label}
      </div>
      <div className={`${styles.subnav_nav} subnav_nav`}>
        {props.children}
      </div>
    </div>
  )
}