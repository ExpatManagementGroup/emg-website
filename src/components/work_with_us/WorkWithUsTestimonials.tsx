import styles from './WorkWithUsTestimonials.module.css';
import Slider from '../Slider';
import Picture from '../Picture';
import Flag from '../Flag';

export default function WorkWithUsTestimonials( { blok }: { blok: any }) {
  return (
    <div className={styles.testimonials}>
      <div className={styles.intro}>
        <p className={styles.title_eyebrow}>{blok.title_eyebrow}</p>
        <h2 className={styles.title_headline}>{blok.title_headline}</h2>
      </div>
      <Slider
        autoWidth={true}
        differentWidth={true}
        centeredSlides={true}
        rewind={true}
      >
        {blok.testimonials?.map((testimonial: any, index: number) => {
          return (
          index % 2 === 0 ?
            <div key={testimonial._uid} className={`${styles.testimonial} ${styles.small_img}`}>
              <Picture
                className={styles.image}
                src={testimonial.content.image.filename}
                alt={testimonial.content.name}
                aspectRatioDesktop='1'
                aspectRatioMobile='1'
                sizes='(min-width: 840px) 5.952vw, 23.255vw'
              />
              <div className={styles.content}>
                <div>
                  <h3 className={styles.name}>{testimonial.content.name}</h3>
                  <div className={styles.info}>
                    <p>{testimonial.content.jobtitle}</p>
                    <p>{testimonial.content.time_employed}</p>
                  </div>
                </div>
                <p className={styles.quote}>{testimonial.content.quote}</p>
              </div>
            </div>
          :
            <div key={testimonial._uid} className={`${styles.testimonial} ${styles.large_img}`}>
              <Picture
                className={styles.image}
                src={testimonial.content.image.filename}
                alt={testimonial.content.name}
                aspectRatioDesktop='1.7272727273'
                aspectRatioMobile='1.7272727273'
                sizes='(min-width: 840px) 34vw, 90vw'
              />
              <div className={styles.content}>
                
                <h3 className={styles.name}>
                  {testimonial.content.name} 
                  <Flag country={testimonial.content.country} className={styles.flag} />
                </h3>
                <div className={styles.info}>
                  <p>{testimonial.content.jobtitle}</p>
                  <p>{testimonial.content.time_employed}</p>
                </div>
                <p className={styles.quote}>{testimonial.content.quote}</p>
              </div>
            </div>
        )})}
      </Slider>
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </div>
  )
}