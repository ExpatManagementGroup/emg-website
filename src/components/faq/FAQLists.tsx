import styles from './FAQLists.module.css';
import FAQ from '../FAQModule';
import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';


export default function FAQLists( { blok }: { blok: any }) {
  
  const [faqOpen, setFaqOpen] = useState('individuals');

  return (
    <div className={styles.faqlists} {...storyblokEditable(blok)} data-open={faqOpen}>
      <div className={styles.switcher}>
        <button 
          className={`${styles.switcher_button}`}
          data-active={faqOpen === 'individuals'}
          onClick={() => setFaqOpen('individuals')}
        >
          Individuals
        </button>
        <button 
          className={styles.switcher_button}
          data-active={faqOpen === 'companies'}
          onClick={() => setFaqOpen('companies')}
        >
          Companies
        </button>
      </div>
      <div className={styles.faqlists_lists}>
        <div className={styles.individuals}>
          <h3 className={styles.title}>For Individuals</h3>
          {blok.faqs_individuals?.map((faq: any) => {
            faq.className = `${styles.faq_individuals}`
            return (
              <FAQ 
                key={faq._uid} 
                props={faq}
              />
            )
          })}
        </div>
        <div className={styles.companies}>
          <h3 className={styles.title}>For Companies</h3>
          {blok.faqs_companies?.map((faq: any) => {
            faq.className = `${styles.faq_companies}`
            return (
              <FAQ 
                key={faq._uid} 
                props={faq}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}