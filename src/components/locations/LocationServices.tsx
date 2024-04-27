import styles from './LocationServices.module.css';
import LocationServicesService from './LocationServicesService';
import { storyblokEditable } from '@storyblok/react';

export default function LocationServices( { blok }: { blok: any }) {
  return (
    <div className={styles.services} {...storyblokEditable(blok)}>
      {blok.services.map((service: any) => (
        <LocationServicesService key={service._uid} props={service} />
      ))}
    </div>
  )
}