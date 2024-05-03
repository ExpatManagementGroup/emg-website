import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./HomeHero.module.css";
import Button from "../ui/Button";
import { render } from 'storyblok-rich-text-react-renderer';
import { useEffect } from "react";


const HomeHero = ({ blok }: { blok: any }) => { 
  
  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement;
    video.play();
  }, []);
  
  return (
  <div {...storyblokEditable(blok)} className={`${styles.wrapper} home_hero`}>
    <video 
      autoPlay={false}
      muted 
      loop 
      playsInline 
      preload="auto"
      className={styles.video}>
      <source src='/assets/video/emg_homevideo.mp4' type="video/mp4" />
    </video>
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