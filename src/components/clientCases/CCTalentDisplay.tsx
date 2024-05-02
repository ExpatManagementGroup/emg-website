import Slider from '../ui/Slider';
import styles from './CCTalent.module.css';
import { storyblokEditable } from "@storyblok/react/rsc";
import CCTalentSlide from './CCTalentSlide';

export default function CCTalent( props:any ) {

  return (
    <div className={styles.talent} {...storyblokEditable(props)}>
      <div className={styles.title}>{props.blok.title}</div>
      <Slider 
          slidesPerViewDesktop={2.75} 
          slidesPerViewMobile={1.1} 
          className={styles.talenttestimonials}
          centeredSlides={true}
          autoWidth={true}
          sliderRef='talenttestimonials'
        >
        {props.data.map((story: any, index: number) => {
          return (
            <CCTalentSlide key={`testimonial-${index}`} slideContent={story.content} />
          )
        })}
      </Slider>
    </div>
  )
}