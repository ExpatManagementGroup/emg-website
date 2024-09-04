'use client';
import styles from './PageImmigrationServices.module.css';
import Picture from './Picture';
import { storyblokEditable } from '@storyblok/react';
import Plus from './ui/Plus';
import { render } from 'storyblok-rich-text-react-renderer';
import { useState, useEffect, useRef } from 'react';
import PageImmigrationService from './PageImmigrationService';

export default function PageImmigrationServices( { blok }: { blok: any }) {

  return (
    <section className={styles.immigration_services} {...storyblokEditable(blok)}>
      {blok.service_items.map((service: any, index: number) => {
        return (
          <PageImmigrationService props={service} key={`immigrationservice-${index}`} />
        )
      })}
    </section>
  )
}