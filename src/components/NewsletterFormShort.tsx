'use client'
import { useState, useEffect, useRef } from 'react';
import CountrySelect from './ui/CountrySelect';

export default function NewsletterFormShort(props: any) {

  const [isClient, setIsClient] = useState(false);
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
  return (
    <>
      <form 
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
      </form>
    </>
    )
  }