import styles from './CCHeader.module.css'
import Image from 'next/image'
import Logo from '../Logo'
import ReactCountryFlag from "react-country-flag"
import Button from '../Button'
import Pill from '../Pill'
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CCHeader( { blok }: { blok: any }) {

  const servicesArray = blok.services.split(',');

  return (
    <div className={styles.ccHeader} {...storyblokEditable(blok)}>
      <picture className={styles.ccHeader_image}>
        <source 
          media="(min-width: 840px)" 
          srcSet={`
            ${blok.hero_image.filename}/m/640x188/filters:format(webp),
            ${blok.hero_image.filename}/m/750x220/filters:format(webp) 750w,
            ${blok.hero_image.filename}/m/828x242/filters:format(webp) 828w,
            ${blok.hero_image.filename}/m/1080x316/filters:format(webp) 1080w,
            ${blok.hero_image.filename}/m/1200x351/filters:format(webp) 1200w,
            ${blok.hero_image.filename}/m/1920x562/filters:format(webp) 1920w
          `}
          sizes='100vw'
        />
        <img 
          src={blok.hero_image.filename} 
          alt={blok.hero_image.alt}
          width={1920}
          height={562}
        />
      </picture>
      <div className={styles.ccHeader_info}>
        <h1 className={styles.title}><span className={styles.title_company}>{blok.case_company}</span> <span className={styles.title_arrow}>→</span> {blok.case_title}
        </h1>
        <Button className={styles.backbutton} type="Link" href='/client-cases' text="←" arrow='none' />
        <div className={styles.logos}>
          <figure className={styles.company_logo}>
            <Image 
              src={blok.case_company_logo.filename}
              alt={blok.case_company_logo.alt}
              fill={true}
            />
          </figure>
          <Logo hideLetters className={styles.emglogo} />
        </div>
        <div className={styles.fromTo}>
          <span className={styles.flag}>
              <ReactCountryFlag 
                countryCode={blok.move_from}
                svg
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
          </span>
          <span className={styles.flag}>
              <ReactCountryFlag 
                countryCode={blok.move_to}
                svg
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
          </span>
          <Button className={styles.button} type="Link" href='/contact-us' text="Start your journey" />
        </div>
        <div className={styles.services}>
          <h2 className={styles.services_title}>Services provided:</h2>
          {servicesArray.map((service: string) => {
            return (
              <Pill className={styles.service} key={service}>
                {service}
              </Pill>
            )
          })}
        </div>
      </div>
    </div>
  )
}