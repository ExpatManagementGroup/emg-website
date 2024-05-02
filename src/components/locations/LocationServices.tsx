import styles from './LocationServices.module.css';
import LocationServicesService from './LocationServicesService';
import { storyblokEditable } from '@storyblok/react';

export default function LocationServices( { blok }: { blok: any }) {

  const colsClass = blok.columns === '3' ? styles.service_columns_3 : styles.service_columns_4;

  return (
    <div className={`${styles.services} ${colsClass}`} {...storyblokEditable(blok)}>
      {blok.services.map((service: any) => (
        <LocationServicesService key={service._uid} props={service} />
      ))}
    </div>
  )
}