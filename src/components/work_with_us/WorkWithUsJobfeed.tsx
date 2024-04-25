import styles from './WorkWithUsJobFeed.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable } from '@storyblok/react';
import Button from '../Button';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import autoAnimate, { getTransitionSizes } from '@formkit/auto-animate'
import Pill from '../Pill';

export default function WorkWithUsJobFeed( { blok }: { blok: any }) {

  const [filter, setFilter] = useState('showall');
  const jobslist = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    jobslist.current && autoAnimate(jobslist.current, {duration: 500, easing: 'cubic-bezier(.69,.05,.37,1.25)'})
    
  }, [filter])

  function getCountryNameByValue(value: string) {
    return blok.countries.find((country: any) => country.value === value)?.name;
  }

  let presentCountries: any[] = []
  let presentCountriesWithNames: any[] = []


  blok.jobs?.forEach((job: any) => {
    if (!presentCountries.includes(job.content.location)) {
      presentCountries.push(job.content.location)
      presentCountriesWithNames.push({value: job.content.location, name: getCountryNameByValue(job.content.location)})
    }
  })

  return (
    <div className={styles.jobfeed} {...storyblokEditable(blok)}>
      <div className={styles.intro}>
        <div className={styles.intro_text}>
          {render(blok.intro)}
        </div>
        <div className={styles.buttons}>
          <div className={`${styles.locationselector} ${styles.locationselector_desktop}`}>
            <span className='selectspan'>
              <select onChange={(e) => {
                  setFilter(presentCountriesWithNames[e.target.selectedIndex-1]?.value || 'showall')}
              }>
                <option value="">Filter Location</option>
                {presentCountriesWithNames.map((country: {value: string, name: string}, index: number) => (
                  <option key={`country_${index}`} value={country.value}>{country.name}</option>
                ))}
              </select>
            </span>
          </div>
          <Button
            href={blok.cta_url}
            text={blok.cta_text}
            type='Link'
          />
        </div>
      </div>
      <div className={styles.jobslist} ref={jobslist}>
        <div className={`${styles.job} ${styles.empty}`}></div>
        {blok.jobs?.map((job: any, index: number) => (
          (filter === 'showall' || filter === job.content.location) &&
          <div key={`job_${index}`} className={styles.job} data-job-index={index} data-country={job.content.location}>
            <div className={styles.text}>
              <div className={styles.jobinfo}>
                <div className={styles.classification}>{job.content.classification}</div>
                <div className={styles.team}>{job.content.team}</div>
                <Pill className={styles.location}>{job.content.location}</Pill>
              </div>
              <h3 className={styles.jobtitle}><Link href={job.full_slug}>{job.content.jobtitle}</Link></h3>
            </div>
            <div className={styles.button}>
              <Button
                href={job.full_slug}
                text='Read more'
                type='Link'
              />
            </div>
          </div>
        ))}
        {
          blok.jobs?.length === 0 &&
          <div className={`${styles.job} ${styles.nojobs}`}>
            <div className={styles.text}>
              <h3 className={styles.jobtitle}>Sorry, there’s no openings right now.</h3>
              <p className={styles.jobinfo}>That&apos;s all for now, but if you&apos;re still interested, get in touch and we&apos;ll keep you top of mind!</p>
            </div>
            <div className={styles.button}>
              <Button
                href='/contact-us'
                text='Get in touch'
                type='Link'
              />
            </div>
          </div>
        }
        {
          blok.jobs?.length > 0 &&
          <div className={`${styles.job} ${styles.end}`}>
            <div className={styles.text}>
              <h3 className={styles.jobtitle}>That&apos;s all for now</h3>
              <p>That&apos;s all for now, but if you&apos;re still interested, get in touch and we&apos;ll keep you top of mind!</p>
            </div>
            <div className={styles.button}>
              <Button
                href='/contact-us'
                text='Get in touch'
                type='Link'
              />
            </div>
          </div>
        }
      </div>
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </div>
  )
}