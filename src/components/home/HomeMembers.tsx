'use client';
import styles from './HomeMembers.module.css';
import Picture from '../Picture';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useEffect, useRef } from 'react';

export default function HomeMembers( { blok }: { blok: any }) {
  const members = useRef<HTMLDivElement>(null);
  const hasClonedLogos = useRef(false);

  useEffect(() => {

    if (members.current === null) return;

    const origLogos = Array.from(members.current.querySelectorAll('picture:not([data-clone="true"]'))
    const logoContainer = members.current.querySelector(`.${styles.logos_inner}`) as HTMLDivElement

    function getTotalScrollWidth() {
      const width = logoContainer?.scrollWidth || 0
      return width
    }

    function isWiderThanWindow() {
      if ( getTotalScrollWidth() <= window.innerWidth ) {
        return false
      }
      else {
        return true
      }
    }

    function cloneLogos() {
      origLogos.forEach((logo: any) => {
        const clone = logo.cloneNode(true);
        clone.setAttribute('data-clone', 'true');
        logo.parentElement.appendChild(clone);
      })
      hasClonedLogos.current = true
    }

    function getClones() {
      return members.current?.querySelectorAll(`[data-clone="true"]`) || []
    }

    function init() {

      const clones = getClones();
      clones.forEach((clone: any) => {
        clone.remove();
      })
      hasClonedLogos.current = false
      
      if ( isWiderThanWindow() && !hasClonedLogos.current ) { 
        members.current?.setAttribute('data-scrolling', 'true')
        if (logoContainer) {
          logoContainer.style.width = `${getTotalScrollWidth()}px`
          logoContainer.style.animationDuration = `${Math.floor(getTotalScrollWidth() / 100)}s`
        }
        cloneLogos();
      }
      else if ( !isWiderThanWindow() ) {
        members.current?.setAttribute('data-scrolling', 'false')
      }

      members.current?.classList.add(styles.loaded)
    }

    init();

    let previousWidth = window.innerWidth;
    let resizeTimer: any;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (previousWidth !== window.innerWidth) {
          previousWidth = window.innerWidth;

          init();
        }
      }, 250)
    })

  }, [blok])

  return (
    <section className={styles.home_members} {...storyblokEditable(blok)} ref={members}>
      <h2 className={styles.title}>{blok.title}</h2>
      <div className={styles.logos}>
        <div className={styles.logos_inner}>
          {blok.logos.map((logo: any, index: number) => {
            return (
              <Picture
                key={`logo-${index}`}
                src={logo.filename}
                alt={logo.alt}
                aspectRatioDesktop="3.137"
                aspectRatioMobile="3.137"
                sizes="(min-width:840px) 11vw, 25vw"
                className={styles.logo}
                nofade={true}
                noCrop={true}
                priority={true}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}