'use client';
import styles from './VideoHero.module.css';

export default function VideoHero( props: { 
  src: string;
  className?: string;
 }) {

  const classNames = [styles.videoHero, props.className].join(' ');

  return (
    <video 
      autoPlay={false}
      muted 
      loop 
      playsInline 
      preload="auto"
      className={classNames}
      style={{
        opacity: 0,
        transition: 'opacity 1s ease-in-out'
      }}
      onLoadedMetadata={(e) => {
        const video = e.target as HTMLVideoElement;
        video.play();
        video.style.opacity = '1';
      }}
    >
      <source src={props.src} type="video/mp4" />
    </video>
  )
}