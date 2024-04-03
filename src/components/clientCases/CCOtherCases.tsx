import styles from './CCOtherCases.module.css';
import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react';

export default function CCOtherCases( props: {
  stories: any,
  title?: string

}) {

  const stories = props.stories;

  return (
    <div className={styles.othercases}>
      <h2 className={styles.title} {...storyblokEditable(props)}>{props.title ? props.title : 'Other client case studies'}</h2>
      <div className={styles.cases}>
        {stories?.map((story: any, index: number) => {
          const caseCompanyLogo = story.content.body[0].case_company_logo
          if (!caseCompanyLogo) { return null }

          return (
            <Link className={styles.case} key={`case-${index}`} href={story.slug}>
              <picture>
                <img src={caseCompanyLogo.filename} alt={caseCompanyLogo.alt} />
              </picture>
            </Link>
          )
        })}
      </div>
    </div>  
  )
}