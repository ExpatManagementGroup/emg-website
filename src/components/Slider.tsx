'use client';
import { useEffect } from 'react';
import styles from './Slider.module.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';

export default function Slider( props: {
  className?: string, 
  children: any,
  slidesPerViewDesktop?: number,
  slidesPerViewMobile?: number,
  duplicate?: boolean,
  sliderRef?: any,
  autoWidth?: boolean
  centeredSlides?: boolean
}) {
   
  let newchildren = props.children;
  const slidesPerViewDesktop = props.slidesPerViewDesktop || 2.75;
  const missingDesktop =  props.children?.length - Math.floor(slidesPerViewDesktop);
  const isMissingSlidesDesktop = missingDesktop < 2;
  const slidesPerViewMobile = props.slidesPerViewMobile || 1.5;
  const missingMobile =  props.children?.length - Math.floor(slidesPerViewMobile);
  const isMissingSlidesMobile = missingMobile < 2;

  if (props.duplicate) {
    const iterations = Math.ceil(missingDesktop / props.children.length)
    if (missingDesktop > 0) {
      for (let i = 0; i < iterations; i++) {
        newchildren = newchildren.concat(props.children)
      }
    }
  }
  const swiperId = props.sliderRef ? `swiper_${props.sliderRef}` : `swiper_1`
  const widthOfSlideDesktop = 100 / slidesPerViewDesktop
  const widthOfSlidesDesktop = widthOfSlideDesktop * newchildren?.length
  const leftOffsetDesktop = -(100 - ( widthOfSlidesDesktop) ) / 2;
  const widthOfSlideMobile = 100 / slidesPerViewMobile
  const widthOfSlidesMobile = widthOfSlideMobile * newchildren?.length
  const leftOffsetMobile = -(100 - ( widthOfSlidesMobile) ) / 2;

  const slideWidthCSS = `
    @media screen and (min-width: 840px) {
      #${swiperId} .swiper-slide {
        width: calc(100% / ${slidesPerViewDesktop});
      }
      #${swiperId} .swiper-wrapper {
        transform: translateX(-${leftOffsetDesktop}%);
      }
    }
    @media screen and (max-width: 839.9px) {
      #${swiperId} .swiper-slide {
        width: calc(100% / ${slidesPerViewMobile});
      }
      #${swiperId} .swiper-wrapper {
        transform: translateX(-${leftOffsetMobile}%);
      }
    }
  `;

  function myPlugin({ swiper, extendParams, on }: { swiper: any, extendParams: any, on: any }) {
    extendParams({
      debugger: true,
    });

    on('init', () => {
      if (!swiper.params.debugger) return;
      console.log('init');
    });
    on('click', (swiper: { params: { debugger: any; }; }, e: any) => {
      if (!swiper.params.debugger) return;
      console.log('click');
    });
    on('tap', (swiper: { params: { debugger: any; }; }, e: any) => {
      if (!swiper.params.debugger) return;
      console.log('tap');
    });
    on('doubleTap', (swiper: { params: { debugger: any; }; }, e: any) => {
      if (!swiper.params.debugger) return;
      console.log('doubleTap');
    });
    on('sliderMove', (swiper: { params: { debugger: any; }; }, e: any) => {
      if (!swiper.params.debugger) return;
      console.log('sliderMove');
    });
    on('slideChange', () => {
      if (!swiper.params.debugger) return;
      console.log(
        'slideChange',
        swiper.previousIndex,
        '->',
        swiper.activeIndex
      );
    });
    on('slideChangeTransitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionStart');
    });
    on('slideChangeTransitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionEnd');
    });
    on('transitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionStart');
    });
    on('transitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionEnd');
    });
    on('fromEdge', () => {
      if (!swiper.params.debugger) return;
      console.log('fromEdge');
    });
    on('reachBeginning', () => {
      if (!swiper.params.debugger) return;
      console.log('reachBeginning');
    });
    on('reachEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('reachEnd');
    });
  }

  let counter = 0
  
  useEffect(() => {

    if (counter > 0) { return }

    const swiper = new Swiper(`#${swiperId}`,{
      modules: [myPlugin, Navigation, Pagination, Mousewheel],
      centeredSlides: props.centeredSlides || false,
      centeredSlidesBounds: props.centeredSlides || false,
      centerInsufficientSlides: isMissingSlidesMobile,
      breakpoints: {
        840: {
          slidesPerView: !props.autoWidth ? 'auto' : props.slidesPerViewDesktop || 2.75,
          loop: !isMissingSlidesDesktop,
          centerInsufficientSlides: isMissingSlidesDesktop,
        }
      },
      slidesPerView: !props.autoWidth ? 'auto' : props.slidesPerViewMobile || 1.5,
      loop: !isMissingSlidesMobile,
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
    newchildren
  ])

  return(
    <>
    <div className={styles.slidernavbuttons} id={`${swiperId}_nav`}>
      <div className={`swiper-button-prev button button-bg-transparent button-round button-arrow-notext button-arrow-left ${styles.prev}`}></div>
      <div className={`swiper-button-next button button-bg-transparent button-round button-arrow-notext ${styles.next}`}></div>
    </div>
    <div className={`swiper ${styles.swiper} ${props.className} missingSlides-${isMissingSlidesDesktop}`} id={swiperId}>
      { props.autoWidth ? <style>{slideWidthCSS}</style> : null }
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