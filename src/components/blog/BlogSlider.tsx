import styles from './BlogSlider.module.css';
import { storyblokEditable } from "@storyblok/react";
import { render } from 'storyblok-rich-text-react-renderer';
import Slider from '../ui/Slider';
import Picture from '../Picture';
import Link from 'next/link';
import FormattedDate from '../ui/FormattedDate';
import Button from '../ui/Button';
import Pill from '../ui/Pill';

export default function BlogSlider( { blok }: { blok: any } ) {

  const allBlogPosts = blok.blogPosts
  const selectedTopics = blok.topics
  let selectedBlogPosts = selectedTopics[0] ? allBlogPosts?.filter((post: any) => selectedTopics.includes(post.content.topic)) : allBlogPosts
  const selectedCountries = blok.countries
  selectedBlogPosts = selectedCountries ? selectedBlogPosts?.filter((post: any) => selectedCountries.includes(post.content.country)) : selectedBlogPosts


  return (
    <div 
      className={styles.blogslider_wrapper} 
      {...storyblokEditable(blok)}
      style={{
        "backgroundColor": `${blok.bg_color}`,
      }}
    >
      <div className={styles.title}>
        {render(blok.title)}
      </div>
      {/* <pre>{JSON.stringify(selectedBlogPosts, null, 2)}</pre> */}
      <Slider 
        className={styles.blogslider} 
        slidesPerViewDesktop={5.7931833543} 
        slidesPerViewMobile={1.5} 
        sliderRef="blog"
        centeredSlides={false}
        autoWidth={false}
        loop={ blok.blogPosts?.length > 5 ? true : false }
      >
        {selectedBlogPosts?.map((story: any, index: number) => {
          const props = story.content
          const thisTopic = blok.alltopics?.find((topic: any) => topic.value === props.topic)
          const thisTopicName = thisTopic ? thisTopic.name : 'General'
          

          return (
            <div key={`story-${index}`} className={`${styles.postcard} ${props.isFeature ? styles.postcard_featured : styles.postcard_regular}`}>
              {/* <div>{JSON.stringify(blok.countries)} - {props.country}</div> */}
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
                  <Pill>{props.country ? props.country : "Global"}</Pill>
                  <Link href={`/insights/topics/${props.topic}`} >
                  <Pill>{thisTopicName}</Pill>
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