import Logo from "@/components/ui/Logo"
import styles from './loading.module.css';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={styles.loading} >
      <Logo hideLetters={false} className={styles.logo} />
    </div>
  )
}