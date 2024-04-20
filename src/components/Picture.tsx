export default function Picture( props: {
  src: string,
  aspectRatioDesktop: string,
  aspectRatioMobile: string,
  alt: string,
  sizes?: string,
  className?: string,
  width?: number,
  height?: number
} ) {

  if (props.src?.includes('.svg')) {
    return (
      <picture className={props.className}>
        <img src={props.src} alt={props.alt} />
      </picture>
    )
  }
  else {
    return(
      <picture className={props.className}>
        <source 
          media="(min-width: 840px)" 
          srcSet={`
            ${props.src}/m/320x${Math.ceil(320/Number(props.aspectRatioDesktop))}/filters:format(webp),
            ${props.src}/m/480x${Math.ceil(480/Number(props.aspectRatioDesktop))}/filters:format(webp) 480w,
            ${props.src}/m/640x${Math.ceil(640/Number(props.aspectRatioDesktop))}/filters:format(webp) 640w,
            ${props.src}/m/750x${Math.ceil(750/Number(props.aspectRatioDesktop))}/filters:format(webp) 750w,
            ${props.src}/m/828x${Math.ceil(828/Number(props.aspectRatioDesktop))}/filters:format(webp) 828w,
            ${props.src}/m/1080x${Math.ceil(1080/Number(props.aspectRatioDesktop))}/filters:format(webp) 1080w,
            ${props.src}/m/1200x${Math.ceil(1200/Number(props.aspectRatioDesktop))}/filters:format(webp) 1200w,
            ${props.src}/m/1920x${Math.ceil(1920/Number(props.aspectRatioDesktop))}/filters:format(webp) 1920w
          `}
          sizes={props.sizes ? props.sizes : '100vw'}
        />
        <source 
          media="(max-width: 839.9px)" 
          srcSet={`
            ${props.src}/m/320x${Math.ceil(320/Number(props.aspectRatioMobile))}/filters:format(webp),
            ${props.src}/m/375x${Math.ceil(375/Number(props.aspectRatioMobile))}/filters:format(webp) 375w,
            ${props.src}/m/414x${Math.ceil(414/Number(props.aspectRatioMobile))}/filters:format(webp) 414w,
            ${props.src}/m/540x${Math.ceil(540/Number(props.aspectRatioMobile))}/filters:format(webp) 540w,
            ${props.src}/m/600x${Math.ceil(600/Number(props.aspectRatioMobile))}/filters:format(webp) 600w,
            ${props.src}/m/768x${Math.ceil(768/Number(props.aspectRatioMobile))}/filters:format(webp) 768w,
            ${props.src}/m/1080x${Math.ceil(1080/Number(props.aspectRatioMobile))}/filters:format(webp) 1080w
          `}
          sizes={props.sizes ? props.sizes : '100vw'}
        />
        <img 
          src={props.src} 
          alt={props.alt}
          width={props.width || 1080}
          height={props.height || 1080*Math.ceil(Number(props.aspectRatioDesktop))}
          sizes={props.sizes ? props.sizes : '100vw'}
        />
      </picture>
    )
  }
}