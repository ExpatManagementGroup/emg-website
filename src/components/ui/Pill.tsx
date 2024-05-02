import styles from './Pill.module.css'

export default function Pill(props: {children: any, className?: string, bgcolor?: string, color?: string, bordercolor?: string}) {

  const classNames = ['pill', styles.pill, props.className].join(' ')

  return (
    <div className={classNames} style={{
      "backgroundColor": props.bgcolor,
      "color": props.color,
      "borderColor": props.bordercolor
    }}>
      {props.children}
    </div>
  )
}