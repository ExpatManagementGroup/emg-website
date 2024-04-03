import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./HomeStats.module.css";
import { useEffect, useRef } from "react";

export default function HomeStats({ blok }: { blok: any }) {

  const initialized = useRef(false)

  useEffect(() => {
    const rows = document.querySelectorAll(`.${styles.row}`);
    
    function setvars() {
      rows.forEach((row: any) => {
        let width = 0;
        row.childNodes.forEach((child: any) => {
          width += child.clientWidth;
        });
        row.style.setProperty('--row-width', `${initialized.current ? width/2 : width}px`);
      });
    }
    setvars();
    window.addEventListener('resize', setvars);

    // make sure this runs only once with useRef and initialized.current
    // otherwise you'll have too many clones
    if (!initialized.current) {
      initialized.current = true
      rows.forEach((row: any) => {
        // duplicate all the child nodes
        row.childNodes.forEach((child: any) => {
          const clone = child.cloneNode(true);
          clone.classList.add('clone');
          row.appendChild(clone);
        });
        row.classList.add(styles.initialized);
      })
    }
  }, []);

  return (
    <section className={styles.stats} {...storyblokEditable(blok)}>
      <div className={styles.row}>
        <div className={styles.members}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_team_members}</span>
            <span className={styles.label}>Team <br />Members</span>
          </div>
        </div>
        <div className={styles.nationalities}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_team_nationalities}</span>
            <span className={styles.label}>Team <br />Nationalities</span>
          </div>
        </div>
        <div className={styles.languages}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_team_languages}</span>
            <span className={styles.label}>Team <br />Languages</span>
          </div>
        </div>
        <div className={styles.offices}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_office_locations}</span>
            <span className={styles.label}>Office <br />Locations</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.immigrations}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_immigrations}</span>
            <span className={styles.label}>Immigrations <br />or Relocations</span>
          </div>
        </div>
        <div className={styles.clients}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_clients}</span>
            <span className={styles.label}>Beloved <br />Clients</span>
          </div>
        </div>
        <div className={styles.years}>
          <div className={styles.centerwrap}>
            <span className={styles.number}>{blok.stats_years}</span>
            <span className={styles.label}>Years in <br />Operation</span>
          </div>
        </div>
      </div>
    </section>
  )
}