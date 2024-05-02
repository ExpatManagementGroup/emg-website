import styles from './WorkWithUsMoreJobs.module.css';
import Button from '../ui/Button';
import Pill from '../ui/Pill';
import Link from 'next/link';

export default function WorkWithUsMoreJobs( props: { jobs: any, slug: string}) {
  return (
    <div className={styles.morejobs}>
      <h2 className={styles.morejobsheader}>Other roles we’re looking for</h2>
      <div className={styles.morejobs_jobs}>
        {props.jobs.map((job: any) => {
          if (job.slug !== props.slug) {
            return (
              <div key={job.id} className={styles.job}>
                <div className={styles.jobinfo}>
                  <span>{job.content.classification}</span>
                  <span>{job.content.team}</span>
                  <Pill>{job.content.location}</Pill>
                </div>
                <h3 className={styles.jobtitle}>
                  <Link href={`/work-with-us/${job.slug}`}>{job.content.jobtitle}</Link>
                </h3>
                <div className={styles.button}>
                  <Button
                    type="Link"
                    href={`/work-with-us/${job.slug}`}
                    text="Read more"
                    bgcolor='transparent'
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  )
}