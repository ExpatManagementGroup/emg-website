'use client';
import styles from './ContactForm.module.css';
import { useEffect, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';

export default function ContactUs({ blok }: { blok: any }) {

  const [isClient, setIsClient] = useState(false);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
        setStatus('pending');
        setError('');
        const myForm = event.target as any;
        const formData = new FormData(myForm) as any;
        const urlSearchParams = new URLSearchParams(formData) as any ;
        const res = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlSearchParams.toString()
        });
        if (res.status === 200) {
          setStatus('ok');
        } else {
          setStatus('error');
          setError(`${res.status} ${res.statusText}`);
        }
    } catch (e) {
        setStatus('error');
        setError(`${e}`);
    }
  };

  return (
    <div className={styles.contactform} id={blok.anchor ? blok.anchor : blok._uid} {...storyblokEditable(blok)}>
      <form onSubmit={handleFormSubmit} name='contactform-block' method="POST" data-netlify="true">
        {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
        <input type="hidden" name="form-name" value='contactform-block' />
        <input type="hidden" name="form-location" value={`form-location-${window.location.pathname}`} />
        <input type="hidden" name="form-uid" value={`form-uid-${blok.form_ui}`} />
        <div className={styles.info}>
          <div className={styles.input}>
            <input type="text" name="firstname" placeholder='First Name' />
          </div>
          <div className={styles.input}>
            <input type="text" name="lastname" id='lastname' placeholder='Last Name' />
          </div>
          <div className={styles.input}>
            <input type="email" name="email" required placeholder='Email' />
          </div>
        </div>
        <div className={styles.message}>
          <textarea name="message" required rows={6} placeholder='Message'></textarea>
        </div>
        <div>
          <button className={`button ${styles.submitbutton}`} type="submit" disabled={status === 'pending'}>Send</button>
          {status === 'ok' && (
              <div className={`${styles.alert} ${styles.alert_success}`}>
                  <SuccessIcon />
                  Submitted!
              </div>
          )}
          {status === 'error' && (
              <div className={`${styles.alert} ${styles.alert_error}`}>
                  <ErrorIcon />
                  {error}
              </div>
          )}
        </div>
      </form>
    </div>
  )
}

function SuccessIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
      </svg>
  );
}
function ErrorIcon(success: any) {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
      </svg>
  );
}