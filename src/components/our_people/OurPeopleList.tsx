'use client';
import styles from './OurPeopleList.module.css';
import Picture from '../Picture';
import Flag from '../ui/Flag';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate'

export default function OurPeopleList( { blok }: { blok: any }) {
  
  const [filter, setFilter] = useState('showall');
  const peoplelist = useRef(null);

  useEffect(() => {
    peoplelist.current && autoAnimate(peoplelist.current, {duration: 500, easing: 'cubic-bezier(.69,.05,.37,1.25)'})
  })

  function getCountryNameByValue(value: string) {
    return blok.countries.find((country: any) => country.value === value)?.name;
  }

 let presentCountries: any[] = []
 let presentCountriesWithNames: any[] = []

 blok.employees?.forEach((employee: any) => {
    if (!presentCountries.includes(employee.content.country)) {
      presentCountries.push(employee.content.country)
      presentCountriesWithNames.push({value: employee.content.country, name: getCountryNameByValue(employee.content.country)})
    }
    if (employee.content.country_2 && !presentCountries.includes(employee.content.country_2)) {
      presentCountries.push(employee.content.country_2)
      presentCountriesWithNames.push({value: employee.content.country_2, name: getCountryNameByValue(employee.content.country_2)})
    }
 })
  
  return (
    <section className={styles.ourpeople}>
      <div className={`${styles.locationselector} ${styles.locationselector_desktop}`}>
        <span className='selectspan'>
          <select onChange={(e) => {
              setFilter(presentCountriesWithNames[e.target.selectedIndex-1]?.value || 'showall')}
          }>
            <option value="">Filter Location</option>
            {presentCountriesWithNames.map((country: {value: string, name: string}, index: number) => (
              <option key={`country_${index}`} value={country.value}>{country.name}</option>
            ))}
          </select>
        </span>
      </div>
      <div className={styles.people_list} data-filter={filter} ref={peoplelist}>
        <div className={`${styles.locationselector} ${styles.locationselector_mobile}`}>
          <span className='selectspan'>
            <select onChange={(e) => {
                setFilter(presentCountriesWithNames[e.target.selectedIndex-1]?.value || 'showall')}
            }>
              <option value="">Filter Location</option>
              {presentCountriesWithNames.map((country: {value: string, name: string}, index: number) => (
                <option key={`country_${index}`} value={country.value}>{country.name}</option>
              ))}
            </select>
          </span>
        </div>
        { blok.employees?.map((employee: any, index: number) => { 
          if (filter === 'showall' || filter === employee.content.country || filter === employee.content.country_2) {
            return( 
            <Link 
              href={`/our-people/${employee.slug}`} 
              key={`employee_${index}`} 
              className={styles.employee}
              data-filtered={filter === 'showall' || filter === employee.content.country || filter === employee.content.country_2}
              data-country={employee.content.country}
              data-country_2={employee.content.country_2}
            >
              <Picture
                className={styles.image}
                src={employee.content.image.filename}
                alt={employee.content.image.alt}
                aspectRatioDesktop='0.7954545455'
                aspectRatioMobile='0.7954545455'
                sizes='(min-width: 840px) 16.666vw, 46vw'
              />
              <div className={styles.countries}>
                <Flag country={employee.content.country} className={styles.country} />
                { employee.content.country_2 &&
                  <Flag country={employee.content.country_2} className={styles.country} />
                }
              </div>
              <div className={styles.text}>
                <h3 className={styles.name}>{employee.content.name}</h3>
                <h4 className={styles.title}>{employee.content.title}</h4>
              </div>
            </Link>
            )
          }
        })}
      </div>
        {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </section>
  )
}