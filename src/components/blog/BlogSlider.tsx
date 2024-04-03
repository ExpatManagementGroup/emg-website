import styles from './BlogSlider.module.css';
import { storyblokEditable } from "@storyblok/react/rsc";
import Slider from '../Slider';
import Picture from '../Picture';
import Link from 'next/link';
import Topic from '../Topic';
import FormattedDate from '../FormattedDate';
import Button from '../Button';

export default function BlogSlider( { blok }: { blok: any } ) {

  return (
    <div {...storyblokEditable(blok)}>
      <Slider 
        className={styles.blogslider} 
        slidesPerViewDesktop={4.8} 
        slidesPerViewMobile={1.5} 
        sliderRef="blog"
        centeredSlides={true}
        // autoWidth={false}
      >
        {blok.blogPosts?.map((story: any, index: number) => {
          const props = story.content
          return (
          <div key={`story-${index}`} className={`${styles.postcard} ${props.isFeature ? styles.postcard_featured : styles.postcard_regular}`}>
            <figure className={styles.featured_image}>
            <Link href={`/insights/${story.slug}`} >
              <Picture
                src={props.featured_image?.filename}
                alt={props.featured_image?.alt}
                aspectRatioDesktop='1'
                aspectRatioMobile='1'
                sizes='(min-width: 840px) 18vw, 80vw'
              />
            </Link>
            </figure>
            <div className={styles.postcard_info}>
              <div className={styles.header_meta}>
                <div className="pill">{props.country}</div>
                <Link href={`/insights/topics/${props.topic}`} >
                <div className="pill"><Topic name={props.topic}/></div>
                </Link>
                <div className={styles.date}>
                  <FormattedDate date={props.date} />
                </div>
              </div>
              <h2 className={styles.postcard_title}><Link href={`/insights/${story.slug}`}>{props.title}</Link></h2>
              <Button type="Link" href={`/insights/${story.slug}`} text="Read more" bgcolor='transparent' />
            </div>
          </div>
        )})}
      </Slider>
    </div>
  )
};