import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./HomeHero.module.css";
import Button from "../ui/Button";
import VideoHero from "../ui/VideoHero";
import { render } from 'storyblok-rich-text-react-renderer';

const HomeHero = ({ blok }: { blok: any }) => { 
  
  return (
  <div {...storyblokEditable(blok)} className={`${styles.wrapper} home_hero`}>
    <VideoHero src="/assets/video/emg_homevideo.mp4" className={styles.video} />
    {/* <video 
      autoPlay={true}
      muted 
      loop 
      playsInline 
      poster="/assets/video/videostill.webp"
      preload="auto"
      className={styles.video}
    >
      <source src='/assets/video/emg_homevideo.mp4' type="video/mp4" />
    </video> */}
    <div>
      <h1 {...storyblokEditable(blok.hero)} className={styles.title}>{blok.hero_title_1}<span className='h_italics'>{blok.hero_title_2}</span></h1>
      <Button 
        type="Link"
        className={`${styles.cta}`} 
        href="#services"
        text={blok.hero_cta_text}
        bgcolor="white"
        arrow="down"
        scrollLink={true}
      />
    </div>
    <div className={styles.subtitle}>
      {render(blok.hero_subtitle)}
    </div>
  </div>
)}
 
export default HomeHero;