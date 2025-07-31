'use client'
import { useState, useEffect, useRef } from 'react';
import CountrySelect from './ui/CountrySelect';
import { useRouter } from 'next/navigation';
import styles from './NewsletterForm.module.css';

export default function NewsletterFormShort(props: any) {

  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const newsletter_signup_button = useRef(null) as any;

  useEffect(() => {
    setIsClient(true);
    if (newsletter_signup_button.current === null) return; 
    newsletter_signup_button.current?.addEventListener('click', () => {
      sessionStorage.setItem("emgNewsletterSeen", "true");
    })
  }, []);

  if (!isClient) return null;

  const classNamesArray = ['js-cm-form', props.className].join(' ');
  const classNames = classNamesArray.trim();

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
        // Check if props has success_page_url
        if (props.success_page_url && props.success_page_url !== '') {
          router.push(props.success_page_url);
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
    <>
      <form 
        onSubmit={handleFormSubmit} 
        className={classNames} 
        name={`newsletter_signup_form_short${props.formid ? `_${props.formid}` : ''}`}
        id={`newsletter_signup_form_short${props.formid ? `_${props.formid}` : ''}`}
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
      >
        <p className="honpo">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" type="text" />
            </label>
        </p>
        <input 
          type="hidden" 
          name="form-name" 
          value={`newsletter_signup_form_short${props.formid ? `_${props.formid}` : ''}`} 
        />
        <input 
          aria-label="Name" 
          id="fieldName" 
          maxLength={200} 
          name="name" 
          placeholder="Your name" 
          required 
          type="text"
        />
        <input 
          autoComplete="Email" 
          aria-label="Email" 
          id="fieldEmail" 
          maxLength={200}
          name="email" 
          placeholder="Your email" 
          required 
          type="email" 
        />
        <div className='country_signup'>
          <span className="selectspan">
            <CountrySelect required defaultValue="" />
          </span>
          <button ref={newsletter_signup_button} className='button' onClick={() => {}} type="submit">Sign up</button>
        </div>
        {status === 'pending' && (
              <div className={`${styles.alert} ${styles.alert_success}`}>
                  Submitting...
              </div>
          )}
          {status === 'ok' && (
              <div className={`${styles.alert} ${styles.alert_success}`}>
                  <SuccessIcon />
                  Success!
              </div>
          )}
          {status === 'error' && (
              <div className={`${styles.alert} ${styles.alert_error}`}>
                  <ErrorIcon />
                  {error}
              </div>
          )}
      </form>
    </>
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