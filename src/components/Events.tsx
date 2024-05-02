import styles from './Events.module.css'
import Pill from './ui/Pill'
import FormattedDate from './ui/FormattedDate'

export default async function Events(props: any) {

  return (
    <div className={styles.events}>
      <h2 className={styles.events_title}>Upcoming Events</h2>
      <div className={styles.events_rail}>
        { props.data.map((event: any) => ( 
          <div className={styles.event} key={event.id}>
            {/* {JSON.stringify(event)} */}
            <div className={styles.event_meta}>
              <Pill bgcolor='var(--EMG-Deep-Teal)' color='var(--EMG-White)' bordercolor='var(--EMG-Deep-Teal)'>{event.content.location}</Pill>
              <Pill><FormattedDate date={event.content.date} /></Pill>
              <Pill>{event.content.country}</Pill>
              <Pill>{event.content.city}</Pill>
            </div>
            <div className={styles.event_main}>
              <h2>{event.content.name}</h2>
              <a className={styles.event_link} href={event.content.link} target="_blank" rel="noreferrer">To Event</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}