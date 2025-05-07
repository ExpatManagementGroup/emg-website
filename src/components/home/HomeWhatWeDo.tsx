'use client';
import styles from "./HomeWhatWeDo.module.css";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";

export default function HomeWhatWeDo({ blok }: { blok: any }) {
  return (
    <div className={styles.home_what_we_do} {...storyblokEditable(blok)}>
      <Link 
        href="./#me" 
        className={styles.anchorlink} 
        id='me'
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('me')?.scrollIntoView({ behavior: 'smooth' });
          //change focus to the me element
          document.getElementById('me')?.focus();
          //change the URL to add the hash
          window.history.pushState(null, '', '#me');
        }}
      ></Link>
      <div className={styles.home_what_we_do_row}>
        <div className={styles.intro}>
          {blok.whatwedo_intro}
        </div>
        <div className={styles.services}>
          <div className={styles.service_1}>
            <Icon name="checkmark" />
            <p>{blok.whatwedo_bullet_1}</p>
          </div>
          <div className={styles.service_2}>
            <Icon name="checkmark" />
            <p>{blok.whatwedo_bullet_2}</p>
          </div>
          <div className={styles.service_3}>
            <Icon name="checkmark" />
            <p>{blok.whatwedo_bullet_3}</p>
          </div>
          <div className={styles.service_4}>
            <Icon name="immigration" />
            <p>{blok.whatwedo_bullet_4}</p>
          </div>
          <div className={styles.service_5}>
            <Icon name="relocation" />
            <p>{blok.whatwedo_bullet_5}</p>
          </div>
          <div className={styles.service_6}>
            <Icon name="workers" />
            <p>{blok.whatwedo_bullet_6}</p>
          </div>
        </div>
      </div>
      <div className={styles.what_we_do_more}>
        <p>{blok.whatwedo_more_text}</p>
        <Button 
          type="Link"
          className={styles.what_we_do_more_cta}
          text={blok.whatwedo_more_cta}
          href={blok.whatwedo_more_cta_link}
        />
      </div>

      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </div>
  )
}