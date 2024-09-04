import styles from './HomeTestimonials.module.css';
import Button from '../ui/Button';
import Slider from '../ui/Slider';
import CCTalentSlide from '../clientCases/CCTalentSlide';
import CCClientSlide from '../clientCases/CCClientSlide';
import { storyblokEditable } from "@storyblok/react/rsc";

export default function HomeTestimonials( { blok }: { blok: {
  subhead: string,
  title: string,
  talentTestimonials: any,
  clientCaseStories: any,
  cta_url: string,
  cta_text: string,
  anchor: string
} }) {

  const talentData = blok.talentTestimonials;
  const talentTestimonials = talentData;
  const clientCases = blok.clientCaseStories;
  const clientCaseTestimonials = clientCases?.map((story: any) => {
    const blocks = story.content.body;
    const testimonial = blocks.find((block: any) => block.component === "case_testimonial");
    if (!testimonial) return null;
    const clientHeaders = blocks.find((block: any) => block.component === "case_header");
    testimonial.logo = clientHeaders?.case_company_logo;
    testimonial.url = `/our-clients/${story.slug}`;
    return testimonial;
  })
  
  const lengthofAllTestimonials = talentTestimonials?.length + clientCaseTestimonials?.length;
  
  let allTestimonialsAlternating = [];
  
  for(let i = 0; i < lengthofAllTestimonials; i++) {
    if (i % 2 === 0) {
        if (talentTestimonials[Math.floor(i/2)]) {  
          allTestimonialsAlternating.push( talentTestimonials[Math.floor(i/2)].content )
        }
    } 
    else {
      if (clientCaseTestimonials[Math.floor(i/2)]) {  
        allTestimonialsAlternating.push( clientCaseTestimonials[Math.floor(i/2)] )
      }
    }
  }
  // get rid of any null values
  allTestimonialsAlternating = allTestimonialsAlternating.filter((testimonial: any) => testimonial);
  
  return (
    <section className={styles.testimonials} {...storyblokEditable(blok)} id={blok.anchor}>
      { blok.title && blok.subhead &&
        <h2 className={styles.title}>
          <span className={styles.eyebrow}>{blok.subhead}</span>
          {blok.title}
        </h2>
      }
      <Slider 
        slidesPerViewDesktop={2.75} 
        slidesPerViewMobile={1.1} 
        className={styles.testimonialslider}
        centeredSlides={true}
        autoWidth={true}
        sliderRef='hometestimonials'
        loop={allTestimonialsAlternating.length > 4 ? true : false}
        >
        {allTestimonialsAlternating?.map((testimonial: any, index: number) => {
          if (testimonial.component === 'case_testimonial') {
            return (
              <CCClientSlide key={`testimonial-${index}`} slideContent={testimonial} />
            )
          } 
          else {
            return (
              <CCTalentSlide key={`testimonial-${index}`} slideContent={testimonial} />
            )
          }
        })}
      </Slider>
      {blok.cta_url && blok.cta_text &&
      <div className={styles.cta}>
        <Button 
          type="Link"
          href={blok.cta_url}
          text={blok.cta_text}
          bgcolor='transparent'
        />
      </div>
      }
    </section>
  )
}