import styles from './CCHeader.module.css'
import Image from 'next/image'
import Logo from '../ui/Logo'
import ReactCountryFlag from "react-country-flag"
import Button from '../ui/Button'
import Pill from '../ui/Pill'
import Picture from '../Picture'
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CCHeader( { blok }: { blok: any }) {

  const servicesArray = blok.services.split(',');

  return (
    <div className={styles.ccHeader} {...storyblokEditable(blok)}>
      <Picture
        className={styles.ccHeader_image}
        src={blok.hero_image.filename}
        alt={blok.hero_image.alt}
        sizes="(min-width: 840px) 100vw, 0vw"
        width={1920}
        height={562}
        aspectRatioDesktop='3.4103019538'
        aspectRatioMobile='1'
        priority={true}
      />
      <div className={styles.ccHeader_info}>
        <h1 className={styles.title}><span className={styles.title_company}>{blok.case_company}</span> <span className={styles.title_arrow}>→</span> {blok.case_title}
        </h1>
        <Button className={styles.backbutton} type="Link" href='/our-clients' text="←" arrow='none' />
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