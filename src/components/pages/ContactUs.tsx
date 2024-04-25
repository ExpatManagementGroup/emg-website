import styles from './ContactUs.module.css';
import { useEffect, useState } from 'react';
import Picture from '../Picture';
import Flag from '../Flag';
import Icon from '../Icon';

export default function ContactUs( { blok }: { blok: any }) {

  const [isClient, setIsClient] = useState(false);
  const [activeForm, setActiveForm] = useState('general');

  useEffect(() => {

  setIsClient(true);

  }, []);

  if (!isClient) return null;

  return (
    <div className={styles.contact}>
      <div className={styles.content}>
        <h1 className={styles.headline}>{blok.headline}</h1>
        <div className={styles.switcher_row}>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>setActiveForm('general')}
            data-active={activeForm === 'general'}
          >
              General Inquiries
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>setActiveForm('nl')}
            data-active={activeForm === 'nl'}
          >
              NL Team
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>setActiveForm('belux')}
            data-active={activeForm === 'belux'}
          >
              BE/LUX Team
          </button>
          <button 
            className={`button button-bg-transparent ${styles.switcher}`} 
            onClick={()=>setActiveForm('de')}
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
            <form name="contact-general" method="POST" data-netlify="true">
              <div className={styles.info}>
                <div className={styles.input}>
                  <input type="text" name="firstname" placeholder='First Name' />
                </div>
                <div className={styles.input}>
                  <input type="text" name="lastname" id='lastname' placeholder='Last Name' />
                </div>
                <div className={styles.input}>
                  <input type="email" name="email" placeholder='Email' />
                </div>
              </div>
              <div className={styles.message}>
                <textarea name="message" rows={6} placeholder='Message'></textarea>
              </div>
              <div>
                <button className={`button ${styles.submitbutton}`} type="submit">Send</button>
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_nl}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='nl' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_nl}</div>
              <div><Icon name='email' /> {blok.email_nl}</div>
            </div>
            <form name="contact-nl" method="POST" data-netlify="true">
              <div className={styles.info}>
                <div className={styles.input}>
                  <input type="text" name="firstname" placeholder='First Name' />
                </div>
                <div className={styles.input}>
                  <input type="text" name="lastname" id='lastname' placeholder='Last Name' />
                </div>
                <div className={styles.input}>
                  <input type="email" name="email" placeholder='Email' />
                </div>
              </div>
              <div className={styles.message}>
                <textarea name="message" rows={6} placeholder='Message'></textarea>
              </div>
              <div>
                <button className={`button ${styles.submitbutton}`} type="submit">Send</button>
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_belux}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='be' className={styles.flag} /><Flag country='lu' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_be_lux}</div>
              <div><Icon name='email' /> {blok.email_be_lux}</div>
            </div>
            <form name="contact-belux" method="POST" data-netlify="true">
              <div className={styles.info}>
                <div className={styles.input}>
                  <input type="text" name="firstname" placeholder='First Name' />
                </div>
                <div className={styles.input}>
                  <input type="text" name="lastname" id='lastname' placeholder='Last Name' />
                </div>
                <div className={styles.input}>
                  <input type="email" name="email" placeholder='Email' />
                </div>
              </div>
              <div className={styles.message}>
                <textarea name="message" rows={6} placeholder='Message'></textarea>
              </div>
              <div>
                <button className={`button ${styles.submitbutton}`} type="submit">Send</button>
              </div>
            </form>
          </div>
          <div className={`${styles.content_per_location} ${styles.content_de}`}>
            <div className={styles.contactinfo}>
              <div><Flag country='de' className={styles.flag} /></div>
              <div><Icon name='phone' /> {blok.phone_de}</div>
              <div><Icon name='email' /> {blok.email_de}</div>
            </div>
            <form name="contact-de" method="POST" data-netlify="true">
              <div className={styles.info}>
                <div className={styles.input}>
                  <input type="text" name="firstname" placeholder='First Name' />
                </div>
                <div className={styles.input}>
                  <input type="text" name="lastname" id='lastname' placeholder='Last Name' />
                </div>
                <div className={styles.input}>
                  <input type="email" name="email" placeholder='Email' />
                </div>
              </div>
              <div className={styles.message}>
                <textarea name="message" rows={6} placeholder='Message'></textarea>
              </div>
              <div>
                <button className={`button ${styles.submitbutton}`} type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.switchermap_col}>
        <div className={styles.switchermap} onClick={()=>setActiveForm('nl')} data-active={activeForm === 'nl'}>
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
        <div className={styles.switchermap} onClick={()=>setActiveForm('belux')} data-active={activeForm === 'belux'}>
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
        <div className={styles.switchermap} onClick={()=>setActiveForm('de')} data-active={activeForm === 'de'}>
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