import { storyblokEditable, ISbStoriesParams } from "@storyblok/react/rsc";
import PostCard from "../PostCard";
import { render } from 'storyblok-rich-text-react-renderer';
import styles from "./Post_1.module.css";
import FormattedDate from "../ui/FormattedDate";
import Picture from "../Picture";
import Pill from "../ui/Pill";

const Post_1 = ({ blok }: { blok: any }) => {

  const thisTopicName = blok.topics?.find((topic: any) => topic.value === blok.topic)?.name || blok.topic

  return (
    <div {...storyblokEditable(blok)} className={styles.post}>
      <div className={styles.header}>
        <figure className={styles.header_bg}>
          <Picture
            src={blok.featured_image?.filename}
            aspectRatioDesktop="0.6"
            aspectRatioMobile="1.069"
            alt={blok.featured_image?.alt}
            sizes="(min-width:840px) 50vw, 100vw"
            className={styles.backgroundImage}
            priority={true}
          />
        </figure>
        <div className={styles.header_text}>
          <h1 className={styles.title}>{blok.title}</h1>
          <div className={styles.header_meta}>
            { blok.reading_time &&
              <Pill bgcolor="var(--EMG-Deep-Teal)" color="var(--EMG-White)" className={styles.readingtime}>{blok.reading_time} min</Pill>
            }
            <Pill>{blok.country}</Pill>
            <Pill>{thisTopicName}</Pill>
            <div className={styles.date}><FormattedDate date={blok.date} /></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {render(blok.content)}
        {blok.morePosts && (
          <section className={styles.morePostsSection}>
            <h4 className={styles.morePosts_title}>Read next:</h4>
            <div className={styles.morePosts}>
              {blok.morePosts.map((post: ISbStoriesParams, index: number) => { 
                const hasTopic = blok.topics?.find((topic: any) => topic.value === post.content?.topic)
                const thisTopicName = hasTopic ? hasTopic.name : 'no topic'
                return (
                  <PostCard 
                    featured_image_alt={post.content?.featured_image?.alt}
                    featured_image_url={post.content?.featured_image?.filename}
                    title={post.content?.title}
                    country={post.content?.country}
                    topicSlug={post.content?.topic}
                    topicName={thisTopicName}
                    // topicName={'hank'}
                    date={post.content?.date}
                    key={index}
                    slug={post.slug || '/'}
                  />
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
};
 
export default Post_1;