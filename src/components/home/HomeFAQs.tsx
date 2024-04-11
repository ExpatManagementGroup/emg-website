import styles from './HomeFAQs.module.css';
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from 'storyblok-rich-text-react-renderer';
import Button from '../Button';
import FAQ from '../FAQModule';

export default function HomeFAQs({ blok }: { blok: any }) {

  return (
    <div className={styles.homefaqs} {...storyblokEditable(blok)}>
      <div className={styles.title}>{render(blok.title)}</div>
      <div className={styles.faqs}>
        {blok.faqs.map((faq: any, index: number) => {
          return (
            <FAQ key={`faq-${index}`} props={faq} />
          )
        })}
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