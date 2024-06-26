'use client';
import styles from './HomeMembers.module.css';
import Picture from '../Picture';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useEffect, useRef } from 'react';

export default function HomeMembers( { blok }: { blok: any }) {
  const members = useRef<HTMLDivElement>(null);
  let membersInitCounter = 0;

  useEffect(() => {

    if (members.current === null) return;
    if (membersInitCounter > 0) return;
    membersInitCounter++;

    const origLogos = Array.from(members.current.querySelectorAll('picture'))
          

    function throttle(callback: any, limit: number) {
      var wait = false;
      return function () {
        if (!wait) {
          callback.apply(null, arguments);
          wait = true;
          setTimeout(function () {
            wait = false;
          }, limit);
        }
      }
    }

    function getTotalScrollWidth() {
      let width = 0;
      origLogos.forEach((logo: any) => {
        width = width + logo.scrollWidth
      })
      return width
    }

    function isOverlapping() {
      if ( getTotalScrollWidth() < window.innerWidth ) {
        return false
      }
      else {
        return true
      }
    }

    function cloneLogos() {
      origLogos.forEach((logo: any) => {
        const clone = logo.cloneNode(true);
        clone.classList.add(styles.clone)
        logo.parentElement.appendChild(clone)
      })
    }

    function getClones() {
      return members.current?.querySelectorAll(`.${styles.clone}`) || []
    }

    function init() {

      const style = document.createElement('style');
      style.classList.add('home_members_style')
      document.head.appendChild(style)
      
      if ( isOverlapping() ) {
        cloneLogos()
        style.innerHTML = `
          @keyframes membersScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${getTotalScrollWidth()}px);
            }
          }
          .${styles.home_members} .${styles.logos} picture {
            animation: membersScroll ${origLogos.length * 2}s linear infinite;
          }
        `
      }

      members.current?.classList.add(styles.loaded)
    }

    function reset() {
      
      const style = document.querySelector('.home_members_style')
      
      if ( isOverlapping() ) {
        if ( getClones().length === 0 ) {
          cloneLogos()
        }
        if (style) {
          style.innerHTML = `
            @keyframes membersScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${getTotalScrollWidth()}px);
              }
            }
            .${styles.home_members} .${styles.logos} picture {
              animation: membersScroll ${origLogos.length * 2}s linear infinite;
            }
          `
        }
      }
      else {
        if ( getClones().length > 0) {
          getClones().forEach( clone => {
            clone.remove()
          })
        }
        if (style) {
          style.innerHTML = `
            .${styles.home_members} .${styles.logos} picture {
              animation: none;
            }
          `
        }
      }
    }

    init();

    window.addEventListener('resize', reset)


  }, [blok, membersInitCounter])

  return (
    <section className={styles.home_members} {...storyblokEditable(blok)} ref={members}>
      <h2 className={styles.title}>{blok.title}</h2>
      <div className={styles.logos}>
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
            />
          )
        })}
      </div>
    </section>
  )
}