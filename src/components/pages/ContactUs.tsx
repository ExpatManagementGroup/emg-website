import styles from './ContactUs.module.css';
import { useEffect, useState } from 'react';
import Picture from '../Picture';
import Flag from '../ui/Flag';
import Icon from '../ui/Icon';

export default function ContactUs( { blok }: { blok: any }) {

  const [isClient, setIsClient] = useState(false);
  const [activeForm, setActiveForm] = useState('general');

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    setIsClient(true);
    setActiveForm(window.location.hash.replace('#', '').toLowerCase() || 'general');
  }, []);

  if (!isClient) return null;

  function switchLocation(location: string) {
    setActiveForm(location);
    window.location.hash = location;
  }

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
    <div className={styles.contact}>
      <div className={styles.content}>
        <h1 className={styles.headline}>{blok.headline}</h1>
        <div className={styles.switcher_row}>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>switchLocation('general')}
            data-active={activeForm === 'general'}
          >
              General Inquiries
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>switchLocation('nl')}
            data-active={activeForm === 'nl'}
          >
              NL Team
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>switchLocation('belux')}
            data-active={activeForm === 'belux'}
          >
              BE/LUX Team
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>switchLocation('de')}
            data-active={activeForm === 'de'}
          >
              DE Team
          </button>
        </div>
        <div className={styles.forms} data-showing={activeForm}>
          <div className={`${styles.content_per_location} ${styles.content_general}`}>
            <div className={styles.contactinfo}>
              <div><Icon name='global' /></div>
              <div><Icon name='phone' /> {blok.phone_general}</div>
              <div><Icon name='email' /> {blok.email_general}</div>
            </div>
            <form onSubmit={handleFormSubmit} name="contact-general" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact-general" />
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
                    <div className="alert alert-success">
                        <SuccessIcon />
                        Submitted!
                    </div>
                )}
                {status === 'error' && (
                    <div className="alert alert-error">
                        <ErrorIcon />
                        {error}
                    </div>
                )}
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_nl}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='nl' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_nl}</div>
              <div><Icon name='email' /> {blok.email_nl}</div>
            </div>
            <form onSubmit={handleFormSubmit} name="contact-nl" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact-nl" />
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
                    <div className="alert alert-success">
                        <SuccessIcon />
                        Submitted!
                    </div>
                )}
                {status === 'error' && (
                    <div className="alert alert-error">
                        <ErrorIcon />
                        {error}
                    </div>
                )}
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_belux}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='be' className={styles.flag} /><Flag country='lu' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_be_lux}</div>
              <div><Icon name='email' /> {blok.email_be_lux}</div>
            </div>
            <form onSubmit={handleFormSubmit} name="contact-belux" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact-belux" />
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
                    <div className="alert alert-success">
                        <SuccessIcon />
                        Submitted!
                    </div>
                )}
                {status === 'error' && (
                    <div className="alert alert-error">
                        <ErrorIcon />
                        {error}
                    </div>
                )}
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_de}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='de' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_de}</div>
              <div><Icon name='email' /> {blok.email_de}</div>
            </div>
            <form onSubmit={handleFormSubmit} name="contact-de" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact-de" />
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
                    <div className="alert alert-success">
                        <SuccessIcon />
                        Submitted!
                    </div>
                )}
                {status === 'error' && (
                    <div className="alert alert-error">
                        <ErrorIcon />
                        {error}
                    </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.switchermap_col}>
        <div className={styles.switchermap} onClick={()=>switchLocation('nl')} data-active={activeForm === 'nl'}>
          <Picture
            src={blok.mapimage_nl.filename}
            alt={blok.mapimage_nl.alt}
            className={styles.switchermap_image}
            aspectRatioDesktop='1.4570446735'
            aspectRatioMobile='1.5118110236'
            sizes='(min-width: 840px) 26vw, 90vw'  
          />
          <div className={styles.switchermap_title}>
            <span className={styles.country}>Netherlands</span> Office
          </div>
        </div>
        <div className={styles.switchermap} onClick={()=>switchLocation('belux')} data-active={activeForm === 'belux'}>
          <Picture
            src={blok.mapimage_be_lux.filename}
            alt={blok.mapimage_be_lux.alt}
            className={styles.switchermap_image}
            aspectRatioDesktop='1.4570446735'
            aspectRatioMobile='1.5118110236'
            sizes='(min-width: 840px) 26vw, 90vw'  
          />
          <div className={styles.switchermap_title}>
            <span className={styles.country}>Belgium</span> Office
          </div>
        </div>
        <div className={styles.switchermap} onClick={()=>switchLocation('de')} data-active={activeForm === 'de'}>
          <Picture
            src={blok.mapimage_de.filename}
            alt={blok.mapimage_de.alt}
            className={styles.switchermap_image}
            aspectRatioDesktop='1.4570446735'
            aspectRatioMobile='1.5118110236'
            sizes='(min-width: 840px) 26vw, 90vw'  
          />
          <div className={styles.switchermap_title}>
            <span className={styles.country}>Germany</span> Office
          </div>
        </div>
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