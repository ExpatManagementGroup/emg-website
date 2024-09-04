// 'use client';
// removing ^ because why is it even there? why would this a client component?
import styles from './OurStoryIntro.module.css';
import Picture from '../Picture';
import { render } from 'storyblok-rich-text-react-renderer';
import Link from "next/link";
import Button from '../ui/Button';
import { storyblokEditable } from '@storyblok/react/rsc';

export default function OurStoryIntro( { blok }: { blok: any }) {
  return (
    <section className={styles.intro} {...storyblokEditable(blok)}>
      <h2 className={styles.title}>{blok.title}</h2>
      <Link 
        href="./#me" 
        className={styles.anchorlink} 
        id='me'
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('me')?.scrollIntoView({ behavior: 'smooth' });
          document.getElementById('me')?.focus();
          window.history.pushState(null, '', '#me');
        }}
      />
      <div className={styles.row}>
        <Picture
          src={blok.image.filename}
          alt={blok.image.alt}
          aspectRatioDesktop="0.760"
          aspectRatioMobile="1"
          sizes="(min-width:840px) 26vw, 95vw"
          className={styles.image}
        />
        <div className={styles.text}>
          <div className={styles.renderedText}>
            {render(blok.text)}
          </div>
          <div className={styles.buttons}>
            <Button 
              type="Link"
              className={styles.button_primary} 
              href={blok.button_primary_url}
              text={blok.button_primary_text}
            />
            <Button 
              type="Link"
              className={styles.button_secondary} 
              href={blok.button_secondary_url}
              text={blok.button_secondary_text}
              bgcolor='white'
            />
          </div>
        </div>
      </div>
    </section>
  )
}