import styles from './Employee.module.css';
import { render } from 'storyblok-rich-text-react-renderer';
import Picture from '../Picture';
// import Flag from '../ui/Flag';
import Button from '../ui/Button';

export default function Employee( { blok }: { blok: any }) {
  return (
    <div className={styles.employee}>
      {/* <pre style={{ "paddingTop": "20rem" }}>
        {JSON.stringify(blok, null, 2)}
      </pre> */}
      <Button className={styles.backbutton} type="Link" href='/our-people' text="←" arrow='inline' />
      { blok.image?.filename && 
        <Picture
          src={blok.image.filename}
          alt={blok.image.alt}
          aspectRatioDesktop="0.753968254"
          aspectRatioMobile="0.753968254"
          className={styles.image}
          sizes="(min-width: 840px) 34vw, 90vw"
          priority={true}
        />
      }
      <div className={styles.text}>
        <h1 className={styles.name}>{blok.name}</h1>
        <div className={styles.title}>
          <span>{blok.title}</span>
          {/* <div className={styles.countries}>
            <Flag country={blok.country} className={styles.flag} />
            { blok.country_2 &&
              <Flag country={blok.country_2} className={styles.flag} />
            }
          </div> */}
        </div>
        <div className={styles.bio}>{render(blok.bio) || `No bio text yet`}</div>
        {blok.education && blok.education !== '' &&
          <div className={`${styles.nonbutton} button button-arrow-none button-bg-citrus`}>{blok.education}</div>
        }
        {blok.languages && blok.languages !== '' &&
          <div className={`${styles.nonbutton} button button-arrow-none button-bg-sorbet`}>{blok.languages}</div>
        }
        <div className={styles.contact}>
          { blok.linkedin && 
          <a className={styles.linkedin} href={blok.linkedin}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.9641 17.2161C32.9641 25.9379 25.7087 33.0298 16.732 33.0298C7.75532 33.0298 0.5 25.9379 0.5 17.2161C0.5 8.49425 7.75532 1.40234 16.732 1.40234C25.7087 1.40234 32.9641 8.49425 32.9641 17.2161Z" fill="white" stroke="#04171D"/>
              <rect width="19.2418" height="17.5686" transform="translate(7.5293 8.42969)" fill="white"/>
              <path d="M24.3659 11.5939V22.8326C24.3659 23.0896 24.2541 23.336 24.0551 23.5177C23.8561 23.6994 23.5862 23.8015 23.3048 23.8015H10.9957C10.7142 23.8015 10.4443 23.6994 10.2453 23.5177C10.0463 23.336 9.93454 23.0896 9.93454 22.8326V11.5939C9.93454 11.3369 10.0463 11.0905 10.2453 10.9088C10.4443 10.7271 10.7142 10.625 10.9957 10.625H23.3048C23.5862 10.625 23.8561 10.7271 24.0551 10.9088C24.2541 11.0905 24.3659 11.3369 24.3659 11.5939ZM14.1791 15.6631H12.0568V21.8638H14.1791V15.6631ZM14.3701 13.5316C14.3712 13.385 14.3407 13.2397 14.2803 13.1039C14.2199 12.9681 14.1308 12.8444 14.018 12.7401C13.9053 12.6357 13.7712 12.5526 13.6233 12.4956C13.4754 12.4386 13.3167 12.4087 13.1561 12.4077H13.1179C12.7915 12.4077 12.4784 12.5261 12.2475 12.7369C12.0167 12.9476 11.887 13.2335 11.887 13.5316C11.887 13.8296 12.0167 14.1155 12.2475 14.3263C12.4784 14.537 12.7915 14.6554 13.1179 14.6554C13.2785 14.6591 13.4382 14.6337 13.588 14.581C13.7379 14.5282 13.8748 14.449 13.9911 14.3478C14.1074 14.2467 14.2007 14.1256 14.2657 13.9916C14.3308 13.8575 14.3662 13.713 14.3701 13.5665V13.5316ZM22.2437 18.0968C22.2437 16.2328 20.9448 15.508 19.6545 15.508C19.232 15.4887 18.8114 15.5709 18.4345 15.7463C18.0577 15.9218 17.7378 16.1844 17.5068 16.5079H17.4473V15.6631H15.4524V21.8638H17.5747V18.5658C17.544 18.228 17.6605 17.8928 17.899 17.633C18.1374 17.3733 18.4784 17.2099 18.848 17.1784H18.9287C19.6036 17.1784 20.1044 17.5659 20.1044 18.5425V21.8638H22.2267L22.2437 18.0968Z" fill="#04171D"/>
            </svg>
          </a>
          }
          { blok.phone &&
          <a className={styles.phone} href={`tel:${blok.phone}`}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16.9993" cy="17.2161" r="15.8137" fill="white" stroke="#04171D"/>
              <path d="M12.726 14.4528C14.13 18.2829 15.5836 19.8111 19.2813 21.4388L17.6788 23.6893C13.4326 21.6565 11.3177 18.2297 10.3217 15.5555L12.726 14.4528Z" fill="#04171D"/>
              <path d="M13.9067 9.16474C14.6574 9.16181 15.2283 9.78651 15.1771 10.4939C15.0965 11.6071 15.1823 12.4102 15.4132 13.4057C15.54 13.9526 15.2531 14.508 14.7971 14.8657C14.1826 15.3479 13.7131 15.9622 13.34 16.4911C12.8228 17.2242 11.0429 17.1715 10.6493 16.3729C9.84033 14.7317 9.29211 11.708 10.4734 9.66509C10.659 9.3442 11.0326 9.17598 11.4197 9.17447L13.9067 9.16474Z" fill="#04171D"/>
              <path d="M25.3032 21.3103C25.3966 20.6068 24.8086 19.9965 24.0589 19.9594C22.879 19.901 22.0451 19.724 21.0264 19.3879C20.4668 19.2032 19.8485 19.4054 19.4176 19.7898C18.8369 20.308 18.1346 20.6743 17.5337 20.9605C16.701 21.3573 16.5423 23.0323 17.3344 23.4974C18.9624 24.4532 22.0749 25.3308 24.3644 24.469C24.724 24.3336 24.9458 24.0036 24.9939 23.6408L25.3032 21.3103Z" fill="#04171D"/>
            </svg>
          </a>
          }
          { blok.email &&
          <a className={styles.email} href={`mailto:${blok.email}`}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.4992 17.2161C33.4992 25.9379 26.2439 33.0298 17.2672 33.0298C8.29047 33.0298 1.03516 25.9379 1.03516 17.2161C1.03516 8.49425 8.29047 1.40234 17.2672 1.40234C26.2439 1.40234 33.4992 8.49425 33.4992 17.2161Z" fill="white" stroke="#04171D"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M25.4649 10.1055C26.0665 10.1055 26.6008 10.3706 26.937 10.7806L17.1737 18.3071L7.49742 10.9173C7.82095 10.4304 8.40447 10.1055 9.07057 10.1055H25.4649ZM7.22852 22.6346V12.2528L14.1715 17.5552L7.24283 22.8466C7.23338 22.7772 7.22852 22.7064 7.22852 22.6346ZM7.86349 23.9136C8.18678 24.1715 8.60883 24.3277 9.07057 24.3277H25.4649C25.8618 24.3277 26.2293 24.2123 26.53 24.0161L19.1523 18.3286L17.8256 19.3514C17.4503 19.6407 16.9037 19.6418 16.5271 19.3542L15.1803 18.3257L7.86349 23.9136ZM20.1556 17.5552L27.2566 23.0294C27.2895 22.9027 27.3069 22.7705 27.3069 22.6346V12.0422L20.1556 17.5552Z" fill="#04171D"/>
            </svg>
          </a>
          }
        </div>
      </div>
    </div>
  )
}