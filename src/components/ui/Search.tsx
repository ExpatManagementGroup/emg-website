'use client';
import styles from './Search.module.css';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';
import { getStoryblokApi, ISbResult } from "@storyblok/react/rsc";

export default function Search( {placeholder, query}: {
  placeholder?: string,
  query?: string,
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  async function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    if (term && term.length > 2 ) {
      params.set('query', term);
    }
    else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function clearSearch() {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
    const searchinput = document.getElementById('search') as HTMLInputElement;
    searchinput.value = '';
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchbar}>
        <input 
          name='search'
          id='search'
          className={styles.input}
          type="text" 
          placeholder={placeholder || 'Search'}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <div className={styles.placeholder}>
          {placeholder}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1116 10.6922C13.8618 8.18675 13.6407 4.7049 11.3932 2.47577C8.8877 -0.0296851 4.81633 -0.0296851 2.32929 2.47577C-0.17617 4.98123 -0.17617 9.05261 2.32929 11.5396C3.58202 12.7924 5.22162 13.4187 6.86123 13.4187C8.1508 13.4187 9.44037 13.0319 10.5457 12.2581L14.3592 16.0716C14.5803 16.2926 14.8566 16.4032 15.1329 16.4032C15.4093 16.4032 15.704 16.2926 15.9067 16.0716C16.3304 15.6479 16.3304 14.9478 15.9067 14.5057L12.1116 10.6922ZM9.84567 9.97373C8.20607 11.6133 5.5348 11.6133 3.8952 9.97373C2.2556 8.33413 2.2556 5.66287 3.8952 4.02326C4.70579 3.21267 5.79272 2.78896 6.86123 2.78896C7.92973 2.78896 9.01666 3.19425 9.82725 4.02326C11.4853 5.66287 11.4853 8.33413 9.84567 9.97373Z" fill="#04171D"/>
          </svg>
        </div>
        <div 
          className={styles.clear} 
          aria-label='clear searchquery'
          onClick={() => clearSearch()}
        > </div>
      </div>
    </div>
  )
}  

