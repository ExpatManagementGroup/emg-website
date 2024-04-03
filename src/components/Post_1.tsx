import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from 'storyblok-rich-text-react-renderer';
import styles from "./Post_1.module.css";
import Topic from "./Topic";
import FormattedDate from "./FormattedDate";
import Picture from "./Picture";

const Post = ({ blok }: { blok: any }) => {
  return (
    <div {...storyblokEditable(blok)} className={styles.post}>
      <div className={styles.header}>
        <figure className={styles.header_bg}>
          <Picture
            src={blok.featured_image?.filename}
            aspectRatioDesktop="1.666"
            aspectRatioMobile="0.935"
            alt={blok.featured_image?.alt}
            sizes="(min-width:840px) 50vw, 100vw"
            className={styles.backgroundImage}
          />
        </figure>
        <div className={styles.header_text}>
          <h1 className={styles.title}>{blok.title}</h1>
          <div className={styles.header_meta}>
            <div className="pill">{blok.country}</div>
            <div className="pill"><Topic name={blok.topic} /></div>
            <div className={styles.date}><FormattedDate date={blok.date} /></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {render(blok.content)}
      </div>
    </div>
  )
};
 
export default Post;