import { storyblokEditable, ISbStoriesParams } from "@storyblok/react/rsc";
import PostCard from "../PostCard";
import { render } from 'storyblok-rich-text-react-renderer';
import styles from "./Post_2.module.css";
import FormattedDate from "../ui/FormattedDate";
import Picture from "../Picture";

const Post_2 = ({ blok }: { blok: any }) => {

  const thisTopicName = blok.topics?.find((topic: any) => topic.value === blok.topic)?.name || blok.topic

  return (
    <div {...storyblokEditable(blok)} className={styles.post}>
      <div className={styles.header}>
        <div className={styles.header_text}>
          <h1 className={styles.title}>{blok.title}</h1>
          <div className={styles.header_meta}>
            { blok.reading_time &&
              <div className={`pill ${styles.readingtime}`}>{blok.reading_time} min</div>
            }
            <div className="pill">{blok.country}</div>
            <div className="pill">{thisTopicName}</div>
            <div className={styles.date}><FormattedDate date={blok.date} /></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {render(blok.content_above)}
      </div>
      <div className={styles.image_row}>
        <Picture
          src={blok.image_1?.filename}
          alt={blok.image_1?.alt}
          aspectRatioDesktop="1.2096774194"
          aspectRatioMobile="1"
          sizes="(min-width:840px) 27vw, 67vw"
          className={styles.image_1}
        />
        <Picture
          src={blok.image_2?.filename}
          alt={blok.image_2?.alt}
          aspectRatioDesktop="1.8010752688"
          aspectRatioMobile="0.3531353135"
          sizes="(min-width:840px) 40vw, 25vw"
          className={styles.image_2}
        />
      </div>
      <div className={styles.content}>
        {render(blok.content_below)}
      </div>
      {blok.morePosts[0] && (
        <section className={styles.morePostsSection}>
          <h3 className={styles.morePosts_title}>Read next:</h3>
          <div className={styles.morePosts}>
            {blok.morePosts.map((post: ISbStoriesParams, index: number) => (
              <PostCard 
                featured_image_alt={post.content?.featured_image?.alt}
                featured_image_url={post.content?.featured_image?.filename}
                title={post.content?.title}
                country={post.content?.country}
                topicSlug={post.content?.topic}
                topicName={blok.topics.find((entry: any) => entry.value === post.content?.topic).name}
                date={post.content?.date}
                key={index}
                slug={post.slug || '/'}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
};
 
export default Post_2;