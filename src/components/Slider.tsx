import { useRef, useEffect } from 'react';
import styles from './Slider.module.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';

export default function Slider( props: {
  className?: string, 
  children: any,
  slidesPerViewDesktop?: number,
  slidesPerViewMobile?: number,
  sliderRef?: any,
  autoWidth?: boolean
  centeredSlides?: boolean,
  loop?: boolean,
  gridRows?: number,
  rewind?: boolean
}) {
   
  let newchildren = props.children;
  const slidesPerViewDesktop = props.slidesPerViewDesktop || 2.75;
  const missingDesktop =  props.children?.length - Math.ceil(slidesPerViewDesktop);
  const isMissingSlidesDesktop = missingDesktop <= 1;
  const slidesPerViewMobile = props.slidesPerViewMobile || 1.5;
  const missingMobile =  props.children?.length - Math.ceil(slidesPerViewMobile);
  const isMissingSlidesMobile = missingMobile <= 1;
  const swiperId = props.sliderRef ? `swiper_${props.sliderRef}` : `swiper_1`
  const widthOfSlideDesktop = 100 / slidesPerViewDesktop
  const widthOfSlidesDesktop = widthOfSlideDesktop * Math.ceil(slidesPerViewDesktop)
  const leftOffsetDesktop = -(100 - ( widthOfSlidesDesktop) ) / 2;
  const widthOfSlideMobile = 100 / slidesPerViewMobile
  const widthOfSlidesMobile = widthOfSlideMobile * Math.ceil(slidesPerViewMobile)
  const leftOffsetMobile = -(100 - ( widthOfSlidesMobile) ) / 2;

  const slideWidthAndCenteredCSS = `
    @media screen and (min-width: 840px) {
      #${swiperId} .swiper-slide {
        width: calc(100% / ${slidesPerViewDesktop});
      }
      #${swiperId} .swiper-wrapper {
        transform: translate3d(-${leftOffsetDesktop}vw, 0px, 0px);
      }
    }
    @media screen and (max-width: 839.9px) {
      #${swiperId} .swiper-slide {
        width: calc(100% / ${slidesPerViewMobile});
      }
      #${swiperId} .swiper-wrapper {
        transform: translate3d(-${leftOffsetMobile}vw, 0px, 0px);
      }
    }
  `;

  let counter = 0
  useEffect(() => {

    if (counter > 0) { return }

    const swiper = new Swiper(`#${swiperId}`,{
      modules: [Navigation, Pagination, Mousewheel],
      centeredSlides: props.centeredSlides || false,
      centeredSlidesBounds: props.centeredSlides || false,
      centerInsufficientSlides: isMissingSlidesMobile,
      breakpoints: {
        840: {
          slidesPerView: props.autoWidth ? 'auto' : props.slidesPerViewDesktop || 2.75,
          loop: props.loop,
          centerInsufficientSlides: isMissingSlidesDesktop,
        }
      },
      slidesPerView: props.autoWidth ? 'auto' : props.slidesPerViewMobile || 1.5,
      loop: props.loop,
      rewind: props.rewind,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      pagination: {
        el: `#${swiperId}_pagination`,
      },
      navigation: {
        nextEl: `#${swiperId}_nav .swiper-button-next`,
        prevEl: `#${swiperId}_nav .swiper-button-prev`,
      },
      on: {
        init: () => {
          const swiper = document.getElementById(swiperId) as HTMLElement
          swiper.style.minHeight = swiper.offsetHeight + 'px'
        },
      }
    });

    counter++

  },[
    props.slidesPerViewDesktop, 
    props.slidesPerViewMobile, 
    counter, 
    isMissingSlidesDesktop, 
    isMissingSlidesMobile, 
    swiperId, 
    props.autoWidth, 
    props.centeredSlides, 
    newchildren,
    props.gridRows,
    props.loop,
    props.rewind
  ])

  return(
    <>
    <div className={`slider-navbuttons ${styles.slidernavbuttons}`} id={`${swiperId}_nav`}>
      <div className={`swiper-button-prev button button-bg-transparent button-round button-arrow-notext button-arrow-left ${styles.prev}`}></div>
      <div className={`swiper-button-next button button-bg-transparent button-round button-arrow-notext ${styles.next}`}></div>
    </div>
    <div className={`swiper ${styles.swiper} ${props.className} missingSlides-${isMissingSlidesDesktop}`} id={swiperId}>
      { props.autoWidth && props.centeredSlides ? <style>{slideWidthAndCenteredCSS}</style> : null }
      <div className='swiper-wrapper'>
        {newchildren?.map((child: any, index: number) => {
          return (
            <div key={index} className='swiper-slide'>
              {child}
            </div>
          )})
        }
      </div>
    </div>
    <div className={`swiper-pagination ${styles.pagination}`} id={`${swiperId}_pagination`}></div>
    </>
  )
}