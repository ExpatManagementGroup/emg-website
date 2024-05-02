'use client';
import styles from './CCOtherCases.module.css';
import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react';
import LogoMarquee from '../ui/LogoMarquee';

export default function CCOtherCases( props: {
  stories: any,
  title?: string
}) {

  const stories = props.stories;

  return (
    <div className={styles.othercases} {...storyblokEditable(props)}>
      { props.title &&
        <h2 className={styles.title}>{props.title}</h2>
      }
      <LogoMarquee>
        {stories?.map((story: any, index: number) => {
            const caseCompanyLogo = story.content.body[0]?.case_company_logo
            if (!caseCompanyLogo || !caseCompanyLogo.filename ) { return null }

            return (
              <Link className={styles.case} key={`case-${index}`} href={story.slug}>
                <picture>
                  <img src={caseCompanyLogo.filename} alt={caseCompanyLogo.alt} />
                </picture>
              </Link>
            )
          })}
      </LogoMarquee>
      {/* <div className={styles.cases}>
        {stories?.map((story: any, index: number) => {
          const caseCompanyLogo = story.content.body[0].case_company_logo
          if (!caseCompanyLogo.filename ) { return null }

          return (
            <Link className={styles.case} key={`case-${index}`} href={story.slug}>
              <picture>
                <img src={caseCompanyLogo.filename} alt={caseCompanyLogo.alt} />
              </picture>
            </Link>
          )
        })}
      </div> */}
    </div>  
  )
}