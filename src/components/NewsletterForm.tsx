'use client';
import styles from './NewsletterForm.module.css';
import { useEffect, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { render } from 'storyblok-rich-text-react-renderer';
import { useRouter } from 'next/navigation';
import CountrySelect from './ui/CountrySelect';

export default function NewsletterForm({ blok }: { blok: any }) {

  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      const urlSearchParams = new URLSearchParams(formData) as any;
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlSearchParams.toString()
      });
      if (res.status === 200) {
        setStatus('ok');
        // Redirect to success page
        if (blok.success_page_url && blok.success_page_url.cached_url) {
          router.push(blok.success_page_url.cached_url);
        }
      } else {
        setStatus('error');
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus('error');
      setError(`Catch Error: ${e}`);
    }
  };

  return (
    <div className={styles.newsletterForm} {...storyblokEditable(blok)}>
      <div className={styles.header}>
        {
          blok.header && blok.header != '' && render(blok.header)
        }
      </div>
      <div className={styles.newsletterForm_form}>
        <form 
          onSubmit={handleFormSubmit} 
          name="newsletterform-block" 
          method="POST" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
        >
          {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
          <p className="honpo">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" type="text" />
            </label>
          </p>
          <input type="hidden" name="form-name" value="contactform-block" />
          <div className={styles.info}>
            <div className={styles.input}>
              <input type="text" name="name" required placeholder="Name" />
            </div>
            <div className={styles.input}>
              <input type="email" name="email" required placeholder="Email" />
            </div>
            <div className={styles.input}>
              <span className={`selectspan ${styles.selectspan}`}>
                <CountrySelect className={styles.select} required defaultValue="" />
              </span>
            </div>
            <div className={styles.input}>
              <input type="text" name="company" id="lastname" placeholder="Company" />
            </div>
            <div className={styles.input_radio}>
              <p>I&apos;m signing up as an...</p>
              <div className={styles.input_radio_group}>
                <label>
                  <input type="radio" name="role" value="expat" /> Expat
                </label>
                <label>
                  <input type="radio" name="role" value="organization" /> Organization
                </label>
              </div>
            </div>
          </div>
          <div className={styles.optin}>
            <label className={styles.checkbox}>
              <input type="checkbox" name="privacy_policy" required />
              {blok.optin_text}
            </label>
          </div>
          <div className={styles.optin_link}>
            <a href={blok.optin_link_url.cached_url || '/'}>
              {blok.optin_link_title }
            </a>
          </div>
          <div>
            <div data-netlify-recaptcha="true"></div>
            <button className={`button ${styles.submitbutton}`} type="submit" disabled={status === 'pending'}>Send</button>
            {status === 'pending' && (
                <div className={`${styles.alert} ${styles.alert_success}`}>
                    Submitting...
                </div>
            )}
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