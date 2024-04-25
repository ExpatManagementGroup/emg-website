import styles from './FAQ.module.css';
import Button from './Button';
import { render } from 'storyblok-rich-text-react-renderer';
import { useEffect, useRef, useState } from 'react';
import Plus from './Plus';

export default function FAQ( { props }: { 
  props: {
    question: string,
    answer: any,
    button_text: string,
    button_url: string
  }
 }) {

  const [faqOpen, setFaqOpen] = useState(false);
  const faq = useRef(null);

  useEffect(() => {
    if (faq.current) {
      const thisfaq = faq.current as HTMLElement,
            toggler = thisfaq.querySelector(`.${styles.toggleContent}`),
            question = thisfaq.querySelector(`.${styles.question}`);
      
      const getTogglerHeight = () => {
        if (!toggler) return 0;
        return toggler?.scrollHeight + 1;
      }

      thisfaq.style.setProperty('--faq-height', `${getTogglerHeight()}px`);
      
      window.addEventListener('resize', () => {
        thisfaq.style.setProperty('--faq-height', `${getTogglerHeight()}px`);
      })
    } 
  });

  return (
    <div className={`${styles.faq} ${ faqOpen ? styles.open : styles.closed}`} ref={faq}>
      <div 
        className={styles.question} 
        aria-label='toggle answer'
        onClick={() => setFaqOpen(!faqOpen)}
      >
          {props.question}
          <Plus state={faqOpen} className={styles.plus} />
      </div>
      <div className={`toggleContent ${styles.toggleContent}`}>
        <div className={styles.answer}>{render(props.answer)}</div>
        {props.button_text && props.button_url &&
          <Button 
            type="Link" 
            href={props.button_url} 
            text={props.button_text} 
            bgcolor='transparent' 
            className={styles.cta}
          />
        }
      </div>
    </div>
  )
}