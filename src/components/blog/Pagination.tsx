'use client'
import styles from './Pagination.module.css';
import Link from 'next/link';
import { usePathname } from "next/navigation"


export default function Pagination( props: { 
  pages: number[],
  nextPage?: number | null,
  prevPage?: number | null,
}) {
  
  const router = usePathname();
  const isActive = (href: string) => {
    return router === href ? styles.active : '';
  }
  
  if (!props.pages[1]) {
    return null;
  }

  let prevLink = '';
  if (props.prevPage === 1) {
    prevLink = '/insights';
  }
  else if (props.prevPage) {
    prevLink = `/insights/archive/page-${props.prevPage}`;
  }
  else {
    prevLink = '';
  }

  return (
    <div className={styles.pagination}>
      <Link
        href={prevLink} 
        className={
          props.prevPage 
          ? styles.prevLink 
          : `${styles.prevLink} ${styles.prevLinkDisabled}` 
        }
      >←</Link>
      {props.pages.map((page: number) => {
        if (page === 1) {
          return (
            <Link 
              href={`/insights`} 
              key={page} 
              className={`${styles.link_to_page_1} ${isActive('/insights') ? styles.active : styles.inactive}`}
            >
              {page}
            </Link>
          )
        }
        else {
          return (
            <Link 
              href={`/insights/archive/page-${page}`} 
              key={page}
              className={isActive(`/insights/archive/page-${page}`) ? styles.active : styles.inactive}
            >
              {page}
            </Link>
          )
        }
      })}
      <Link
        href={props.nextPage ? `/insights/archive/page-${props.nextPage}` : ''} 
        className={props.nextPage ? styles.nextLink : `${styles.nextLink} ${styles.nextLinkDisabled}` }
      >→</Link>
    </div>
  )
}