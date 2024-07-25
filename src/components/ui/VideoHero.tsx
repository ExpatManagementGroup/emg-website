'use client';
import styles from './VideoHero.module.css';
import { useState, useEffect, useRef } from 'react';

export default function VideoHero( props: { 
  src: string;
  className?: string;
 }) {
  const [soundOn, setSoundOn] = useState(false);
  const homevideo = useRef<HTMLVideoElement>(null);

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


  const handleSoundToggle = () => {
    const video = homevideo.current as HTMLVideoElement;
    video.muted = !video.muted;
    setSoundOn(!soundOn);
  }

  return (
    <>
      <video 
        ref={homevideo}
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
      <button 
        style={{
          position: 'absolute',
          bottom: '1em',
          right: '1em',
          zIndex: 1000,
          width: '4em',
          height: '4em',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={handleSoundToggle}
      >
        {
          soundOn ? 
          (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>)
          : 
          (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>) 
        }
      </button>
    </>
  )
}