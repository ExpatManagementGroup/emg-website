import styles from './Search.module.css';
export default function SearchresultsLoading() {
  return (
    <div className={styles.results}>
      <h3 className={styles.results_title}>Searching...</h3>
    </div>
  )
}