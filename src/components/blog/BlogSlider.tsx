import styles from './BlogSlider.module.css';
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from 'storyblok-rich-text-react-renderer';
import Slider from '../Slider';
import Picture from '../Picture';
import Link from 'next/link';
import FormattedDate from '../FormattedDate';
import Button from '../Button';

export default function BlogSlider( { blok }: { blok: any } ) {

  return (
    <div 
      className={styles.blogslider_wrapper} 
      {...storyblokEditable(blok)}
      style={{
        "backgroundColor": `${blok.bg_color}`,
      }}
    >
      <div className={styles.title}>{render(blok.title)}</div>
      {/* {JSON.stringify(blok.title, null, 2)} */}
      <Slider 
        className={styles.blogslider} 
        slidesPerViewDesktop={5} 
        slidesPerViewMobile={1.5} 
        sliderRef="blog"
        centeredSlides={false}
        autoWidth={false}
        loop={ blok.blogPosts?.length > 5 ? true : false }
      >
        {blok.blogPosts?.map((story: any, index: number) => {
          const props = story.content
          const thisTopic = blok.topics?.find((topic: any) => topic.value === props.topic)
          const thisTopicName = thisTopic ? thisTopic.name : props.topic
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
                  <div className="pill">{thisTopicName}</div>
                  </Link>
                  <div className={styles.date}>
                    <FormattedDate date={props.date} />
                  </div>
                </div>
                <h2 className={styles.postcard_title}><Link href={`/insights/${story.slug}`}>{props.title}</Link></h2>
                <Button type="Link" href={`/insights/${story.slug}`} text="Read more" bgcolor='transparent' />
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
};