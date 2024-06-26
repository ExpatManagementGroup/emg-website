import styles from './Plus.module.css';
import { useState, useEffect } from 'react';

export default function Plus( props: { state: boolean, className?: string} ) {

  const [open, setOpen] = useState(props.state);

  useEffect(() => {
    setOpen(props.state)
  }, [props.state])

  return (
    <div className={`circle_plus ${styles.circle_plus} ${open ? styles.opened : styles.closed} ${props.className}`}>
      <div className={styles.circle}>
        <div className={`${styles.horizontal} horizontal`}></div>
        <div className={`${styles.vertical} vertical`}></div>
      </div>
    </div>
  )
}