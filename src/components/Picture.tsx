'use client';

import { useRef, useState, useEffect } from "react";

export default function Picture( props: {
  src: string,
  aspectRatioDesktop: string,
  aspectRatioMobile: string,
  alt: string,
  sizes?: string,
  className?: string,
  width?: number,
  height?: number,
  noCrop?: boolean,
  priority?: boolean,
  nofade?: boolean,
  placeholder?: string
} ) {

  const [loaded, setLoaded] = useState(props.nofade ? true : false)

  const image = useRef<HTMLImageElement>(null)

  const imgStyles = props.nofade ? {} : {
    transition: 'opacity 0.5s',
    opacity: loaded ? '1' : '0',   
  }

  const handleLoad = () => setLoaded(true)

  useEffect(() => {
      if (image.current && image.current.complete) setLoaded(true)
  }, [])

  //get the last four characters of props.src string
  const fileType = props.src ? props.src.slice(-4) : ''

  if (fileType === '') {
    return null
  }
  
  if (props.noCrop) {

    if (fileType === '.svg') {
      return (
        <picture className={props.className}>
          <img
            onLoad={handleLoad} 
            src={props.src} 
            alt={props.alt} 
            ref={image}
            style={imgStyles}
          />
        </picture>
      )
    }
    else {
      return(
        <picture 
          className={props.className}
        >
          <source 
            media="(min-width: 840px)" 
            srcSet={`
              ${props.src}/m/320x0/filters:format(webp) 320w,
              ${props.src}/m/480x0/filters:format(webp) 480w,
              ${props.src}/m/640x0/filters:format(webp) 640w,
              ${props.src}/m/750x0/filters:format(webp) 750w,
              ${props.src}/m/828x0/filters:format(webp) 828w,
              ${props.src}/m/1080x0/filters:format(webp) 1080w,
              ${props.src}/m/1200x0/filters:format(webp) 1200w,
              ${props.src}/m/1920x0/filters:format(webp) 1920w
            `}
            sizes={props.sizes ? props.sizes : '100vw'}
          />
          <source 
            media="(max-width: 839.9px)" 
            srcSet={`
              ${props.src}/m/320x0/filters:format(webp) 320w,
              ${props.src}/m/375x0/filters:format(webp) 375w,
              ${props.src}/m/414x0/filters:format(webp) 414w,
              ${props.src}/m/540x0/filters:format(webp) 540w,
              ${props.src}/m/600x0/filters:format(webp) 600w,
              ${props.src}/m/768x0/filters:format(webp) 768w,
              ${props.src}/m/1080x0/filters:format(webp) 1080w
            `}
            sizes={props.sizes ? props.sizes : '100vw'}
          />
          <img
            onLoad={handleLoad} 
            src={`${props.src}/m/20x0/filters:format(webp):blur(5)`} 
            ref={image}
            alt={props.alt}
            width={props.width || 1080}
            height={props.height || 1080*Math.ceil(Number(props.aspectRatioDesktop))}
            sizes={props.sizes ? props.sizes : '100vw'}
            loading={props.priority ? 'eager' : 'lazy'}
            style={imgStyles}
          />
        </picture>
      )
    }
  }

  if (fileType === '.svg') {
    return (
      <picture className={props.className}>
        <img
          onLoad={handleLoad} 
          src={props.src} 
          alt={props.alt} 
          ref={image}
          style={imgStyles}
        />
      </picture>
    )
  }
  else {
    return(
      <picture 
        className={props.className}
      >
        <source 
          media="(min-width: 840px)" 
          srcSet={`
            ${props.src}/m/320x${Math.ceil(320/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 320w,
            ${props.src}/m/480x${Math.ceil(480/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 480w,
            ${props.src}/m/640x${Math.ceil(640/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 640w,
            ${props.src}/m/750x${Math.ceil(750/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 750w,
            ${props.src}/m/828x${Math.ceil(828/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 828w,
            ${props.src}/m/1080x${Math.ceil(1080/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 1080w,
            ${props.src}/m/1200x${Math.ceil(1200/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 1200w,
            ${props.src}/m/1920x${Math.ceil(1920/Number(props.aspectRatioDesktop))}/smart/filters:format(webp) 1920w
          `}
          sizes={props.sizes ? props.sizes : '100vw'}
        />
        <source 
          media="(max-width: 839.9px)" 
          srcSet={`
            ${props.src}/m/320x${Math.ceil(320/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 320w,
            ${props.src}/m/375x${Math.ceil(375/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 375w,
            ${props.src}/m/414x${Math.ceil(414/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 414w,
            ${props.src}/m/540x${Math.ceil(540/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 540w,
            ${props.src}/m/600x${Math.ceil(600/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 600w,
            ${props.src}/m/768x${Math.ceil(768/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 768w,
            ${props.src}/m/1080x${Math.ceil(1080/Number(props.aspectRatioMobile))}/smart/filters:format(webp) 1080w
          `}
          sizes={props.sizes ? props.sizes : '100vw'}
        />
        <img
          onLoad={handleLoad} 
          src={`${props.src}/m/20x0/smart/filters:format(webp):blur(5)`} 
          ref={image}
          alt={props.alt}
          width={props.width || 1080}
          height={props.height || 1080*Math.ceil(Number(props.aspectRatioDesktop))}
          sizes={props.sizes ? props.sizes : '100vw'}
          loading={props.priority ? 'eager' : 'lazy'}
          style={imgStyles}
        />
      </picture>
    )
  }
}