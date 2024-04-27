import styles from './PageBreak.module.css';
export default function PageBreak( { blok }: { blok: any }) {
  return (
    <div className={`page_break ${styles.page_break}`}></div>
  )
}