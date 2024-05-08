'use client';
import styles from './VideoHero.module.css';
import { useEffect } from 'react';

export default function VideoHero( props: { 
  src: string;
  className?: string;
 }) {

  const startVideo = (video: HTMLVideoElement) => {
    video.play();
    video.style.opacity = '1';
  }

  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video.readyState > 0) {
      startVideo(video);
    } 
    else {
      video.addEventListener("loadedmetadata", function(_event) {
        startVideo(video);
      });
  };
  },[])

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
    >
      <source src={props.src} type="video/mp4" />
    </video>
  )
}