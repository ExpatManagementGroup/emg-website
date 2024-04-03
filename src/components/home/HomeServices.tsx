import styles from "./HomeServices.module.css";
import Icon from "../Icon";
import Button from "../Button";
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from 'storyblok-rich-text-react-renderer';

export default function HomeServices({ blok }: { blok: any }) {

  return (
    <section className={styles.services} {...storyblokEditable(blok)} id='services'>
      <div className={styles.services_row}>
        <div>
          <h2 className={styles.services_intro_title}>{blok.intro_title}</h2>
          <div className={styles.services_intro_text}>
            {render(blok.intro_text)}
          </div>
        </div>
        <div className={styles.services_link_row}>
          <div>
            <Icon 
              name={blok.intro_link_1_icon}
            />
            <Button 
              type="Link"
              bgcolor="white"
              text={blok.intro_link_1_text}
              href={blok.intro_link_1_url}
            />
          </div>
          <div>
            <Icon 
              name={blok.intro_link_2_icon}
            />
            <Button 
              type="Link"
              bgcolor="white"
              text={blok.intro_link_2_text}
              href={blok.intro_link_2_url}
            />
          </div>
        </div>
      </div>
    </section>
  )
}