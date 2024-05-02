import styles from './HomeFAQs.module.css';
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from 'storyblok-rich-text-react-renderer';
import Button from '../ui/Button';
import FAQ from '../ui/FAQModule';

export default function HomeFAQs({ blok }: { blok: any }) {

  return (
    <div className={styles.homefaqs} {...storyblokEditable(blok)}>
      <div className={styles.title}>{render(blok.title)}</div>
      <div className={styles.faqs}>
        <div className={styles.faqs_evens}>
          {blok.faqs.map((faq: any, index: number) => {
            if (index % 2 === 0) return (
              <FAQ key={`faq-${index}`} props={faq} />
            )
          })}
        </div>
        <div className={styles.faqs_odds}>
          {blok.faqs.map((faq: any, index: number) => {
            if (index % 2 !== 0) return (
              <FAQ key={`faq-${index}`} props={faq} />
            )
          })}
        </div>
      </div>
      { blok.button_url && blok.button_text && 
        <div className={styles.cta}>
          <Button
            type="Link"
            href={blok.button_url}
            text={blok.button_text}
            bgcolor='transparent'
          />
        </div>
      }
    </div>
  )
}