'use client'
import Link from "next/link"
import styles from "./Navigation.module.css"
import Logo from "./Logo"
import Subnav from "./NavigationSubnav"
import Image from "next/image"
import { useState } from "react"
import ReactCountryFlag from "react-country-flag"

export default function Navigation(props: any) {
  const navdata = props.navData;
  const [navOpen, setNavOpen] = useState(false);
  
  function toggleNav() {
    setNavOpen(!navOpen);
  }

  function linkClickHandler() {
    if (navOpen) {
      setNavOpen(false);
    }
  }

  return (
    <>
    <div className={styles.header} data-mobile-nav-open={navOpen} data-subnav-open="false">
      <Link href="/" className={styles.logo_link} onClick={linkClickHandler}>
        <Logo />
      </Link>
      <svg className={styles.mobile_nav_toggle} width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleNav}>
        <g className={styles.toggle_on}>
          <rect x="0.962891" y="0.298828" width="16" height="3" rx="1.5" fill="#04171D"/>
          <rect x="0.962891" y="10.2988" width="11" height="3" rx="1.5" fill="#04171D"/>
          <rect x="0.962891" y="5.29883" width="16" height="3" rx="1.5" fill="#04171D"/>
        </g>
        <g className={styles.toggle_off}>
          <rect x="3.08398" width="16" height="3" rx="1.5" transform="rotate(45 3.08398 0)" fill="#04171D"/>
          <rect x="0.962891" y="11.3135" width="16" height="3" rx="1.5" transform="rotate(-45 0.962891 11.3135)" fill="#04171D"/>
        </g>
      </svg>      
      <div className={styles.mobile_headline}>
        <h1>
          <span className={styles.mobile_headline_eyebrow}>Mobility solutions specialists.</span>
          <span className={styles.mobile_headline_normal}>You move,</span>
          <span className={styles.mobile_headline_italic}>we guide.</span>
         </h1>
      </div>
      <Subnav label="Locations" className={styles.countries_toggle}>
        <ul className={styles.subnav_nav_list}>
          <li className={`${styles.navigation_item} navigation_item`}>
            <Link href='/' onClick={linkClickHandler}>
              <span className={styles.countries_toggle_flag}>
                <ReactCountryFlag 
                  countryCode="NL" 
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </span>
              The Netherlands
            </Link>
          </li>
          <li className={`${styles.navigation_item} navigation_item`}>
            <Link href='/' onClick={linkClickHandler}>
            <span className={styles.countries_toggle_flag}>
                  <ReactCountryFlag 
                  countryCode="BE" 
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </span>
              Belgium
            </Link>
          </li>
          <li className={`${styles.navigation_item} navigation_item`}>
            <Link href='/' onClick={linkClickHandler}>
            <span className={styles.countries_toggle_flag}>
                  <ReactCountryFlag 
                  countryCode="LU" 
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </span>
              Luxemburg
            </Link>
          </li>
          <li className={`${styles.navigation_item} navigation_item`}>
            <Link href='/' onClick={linkClickHandler}>
              <span className={styles.countries_toggle_flag}>
                <ReactCountryFlag 
                  countryCode="DE" 
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </span>
              Germany
            </Link>
          </li>
          <li className={`${styles.navigation_item} navigation_item`}>
            <Link href='/' onClick={linkClickHandler}>
              <span className={styles.countries_toggle_flag}>
                <Image 
                  src="/assets/img/flag-global.svg" 
                  width={50} 
                  height={50} 
                  alt="Global"
                  style={{
                    width: 'calc(100% + 4px)',
                    height: 'calc(100% + 4px)',
                    marginLeft: '-2px',
                    marginTop: '-2px'
                  }}
                />
              </span>
              Global
            </Link>
          </li>
        </ul>
      </Subnav>
      <div className={styles.navigation}>
        <div className={styles.navigation_items}>
          { navdata.data.story.content.navigation_items && 
            navdata.data.story.content.navigation_items.map((item: any, index: number) => {
            
            // If it's a regular nav item
            if (item.component == 'navigation_item') {
              return <Link 
                        className={`${styles.navigation_item} navigation_item`} 
                        key={index} 
                        href={item.href}
                        onClick={linkClickHandler}
                      >
                        {item.label}
                      </Link>
            }
            
            // If there's a subnav
            else if (item.component == 'navigation_subnavigation') {
              return (
                <Subnav key={index} label={item.label} className={styles.subnav}>
                  <ul className={styles.subnav_nav_list}>
                    {item.navigation_subnavigation_items.map((subnavItem: any, index: number) => {
                      return (
                        <li key={index}>
                          <Link href={subnavItem.href} onClick={linkClickHandler}>
                            <span>{subnavItem.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </Subnav>
              )
            }
          })}
        </div>
        { navdata.data.story.content.CTA_shown &&
          <div className={styles.nav_cta_separator}></div>
        }
        { navdata.data.story.content.CTA_shown &&
          <Link href={navdata.data.story.content.CTA_href} className={styles.navigation_CTA} onClick={linkClickHandler}>
            {navdata.data.story.content.CTA_label}
          </Link>
        }
      </div>
    </div>
      {/* <pre>
        {JSON.stringify(navdata.data.story.content, null, 2)}
      </pre> */}
    </>
  )  
};
