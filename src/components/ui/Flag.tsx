import styles from './Flag.module.css';
import ReactCountryFlag from 'react-country-flag';

export default function Flag( props: {
  country: string,
  className?: string,
} ) {
  return (
    <span className={`${styles.flag} ${props.className}`}>
      <ReactCountryFlag
        countryCode={props.country}
        svg
        title={props.country}
        style={{
          'width': '100%',
          'height': '100%',
          'position': 'absolute',
          'top': '0',
          'left': '0',
        }}
      />
    </span>
  )
}