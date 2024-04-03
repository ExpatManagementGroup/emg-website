import styles from "./HomeProcess.module.css";
import { render } from "storyblok-rich-text-react-renderer";
import Button from "../Button";
import { useEffect } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function HomeProcess({ blok }: { blok: any }) {

  useEffect(() => {
    const steps = document.querySelectorAll(`.${styles.home_process_step}`);
    function setvars() {
      steps.forEach((step: any) => {
        const desc = step.querySelector(`.${styles.home_process_step_description} > p`);
        const title = step.querySelector(`.${styles.home_process_step_title}`);
        step.style.setProperty('--height', `${desc.scrollHeight}px`);
        step.style.setProperty('--title-height', `${title.scrollHeight}px`);
      });    
    }
    setvars();
    window.addEventListener('resize', setvars);

    const scrollContainer = document.querySelector(`.${styles.home_process_steps}`);

    scrollContainer?.addEventListener("wheel", (evt) => {
      const sl = scrollContainer.scrollLeft,
            sw = scrollContainer.scrollWidth,
            cw = scrollContainer.clientWidth,
            vdirection = (evt as WheelEvent).deltaY < 0 ? -1 : 1;
      
      if (sl >= sw - cw && vdirection === 1) {
        return;
      }
      if (sl <= 0 && vdirection === -1) {
        return;
      }
      evt.preventDefault();
      const wheelEvent = evt as WheelEvent;
      scrollContainer.scrollLeft += wheelEvent.deltaY;
    });

  }, []);

  function toggleStep(target: any) {
    const step = target.closest(`.${styles.home_process_step}`);
    if (step) {
      step.classList.toggle(styles.active);
    }
  }

  return (
    <section className={styles.home_process} {...storyblokEditable(blok)}>
      <h2 className={styles.title}>{blok.home_process_title}</h2>
      <div className={styles.home_process_steps}>
        {blok.home_process_steps.map((step: any, index: number) => (
          <div key={index} className={styles.home_process_step}>
            <div className={styles.home_process_step_number}>
              {`${index < 10 ? '0' + (index + 1).toString() : index + 1}`}
            </div>
            <h3 className={styles.home_process_step_title}>
              {step.title}
            </h3>
            <div className={styles.home_process_step_description}>
              <p>{step.text}</p>
            </div>
            <svg className={styles.home_process_step_toggle} onClick={ (e) => toggleStep(e.target)} width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1.89453" width="56.2803" height="56.2803" rx="28.1401" fill="#FF6E30"/>
              <rect x="1" y="1.89453" width="56.2803" height="56.2803" rx="28.1401" stroke="#04171D" strokeWidth="2"/>
              <line x1="15.8955" y1="31.1536" x2="42.3848" y2="31.1536" stroke="#04171D" strokeWidth="2.24155"/>
              <line x1="29.321" y1="17.8145" x2="29.321" y2="44.3037" stroke="#04171D" strokeWidth="2.24155"/>
            </svg>

          </div>
        ))}
        <div className={styles.home_process_cta}>
          {render(blok.home_process_cta_title)}
        <div className={styles.home_process_cta_buttons}>
          <Button
            type="Link"
            className={styles.home_process_cta_button}
            text={blok.home_process_cta_primary_button_label || "Contact Us"}
            href={blok.home_process_cta_primary_button_url || "/contact"}
          />
          <Button
            type="Link"
            className={styles.home_process_cta_button}
            text={blok.home_process_cta_secondary_button_label || "FAQ"}
            href={blok.home_process_cta_secondary_button_url || "/faq"}
            bgcolor="white"
          />
        </div>
        </div>
      </div>
    </section>
  );
}