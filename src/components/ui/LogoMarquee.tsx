import styles from './LogoMarquee.module.css';
import { useEffect, useRef } from 'react';

export default function LogoMarquee( props: { children: any }) {
  const marqueeMembers = useRef<HTMLDivElement>(null);
  let marqueeMembersInitCounter = 0;

  useEffect(() => {

    if (marqueeMembers.current === null) return;
    if (marqueeMembersInitCounter > 0) return;
    marqueeMembersInitCounter++;

    const origLogos = Array.from(marqueeMembers.current.querySelectorAll(`.${styles.logo}`))
          
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
      return marqueeMembers.current?.querySelectorAll(`.${styles.clone}`) || []
    }

    function init() {

      const style = document.createElement('style');
      style.classList.add('marqueeMembers_style')
      document.head.appendChild(style)
      
      if ( isOverlapping() ) {
        cloneLogos()
        style.innerHTML = `
          @keyframes marqueeMembersScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${getTotalScrollWidth()}px);
            }
          }
          .${styles.marqueeMembers} .${styles.logo} {
            animation: marqueeMembersScroll ${origLogos.length * 2}s linear infinite;
          }
        `
      }
      marqueeMembers.current?.classList.add(styles.loaded)
    }

    function reset() {
      
      const style = document.querySelector('.marqueeMembers_style')
      
      if ( isOverlapping() ) {
        if ( getClones().length === 0 ) {
          cloneLogos()
        }
        if (style) {
          style.innerHTML = `
            @keyframes marqueeMembersScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${getTotalScrollWidth()}px);
              }
            }
            .${styles.marqueeMembers} .${styles.logo} {
              animation: marqueeMembersScroll ${origLogos.length * 2}s linear infinite;
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
            .${styles.marqueeMembers} .${styles.logos} picture {
              animation: none;
            }
          `
        }
      }
    }

    init();

    window.addEventListener('resize', reset)

  }, [props, marqueeMembersInitCounter])

  return (
    <section className={styles.marqueeMembers} ref={marqueeMembers}>
      <div className={styles.logos}>
        {props.children?.map((child: any, index: number) => {
          return (
            <div key={`logo-${index}`} className={styles.logo}>
              {child}
            </div>
          )
        })}
      </div>
    </section>
  )
}

