export default function Icon( props: { variant?: string }){
  let color
  if (props.variant === 'orange') {
    color = 'var(--EMG-Aero-Orange)'
  }
  else {
    color = 'var(--EMG-Hazy-White)'
  }

  return (
    <svg className="icon icon_checkmark" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="12.9912" r="12.5" fill={color} stroke="#04171D"/>
    <path d="M11.9714 17.9912C12.3165 16.4278 14.4247 11.4499 20 8.3514L19.3098 6.99121C14.8183 9.49147 12.3812 13.2165 11.2596 15.7449C10.99 15.2878 10.6719 14.8475 10.3268 14.4355C9.46951 13.4083 8.39652 12.4658 7.59851 12.0933L7 13.4987C7.51763 13.7413 8.42348 14.492 9.21609 15.4458C9.60431 15.9142 9.93861 16.3996 10.1705 16.8624C10.4131 17.3309 10.5156 17.7147 10.5156 17.9912H11.9714Z" fill="#04171D"/>
  </svg>
  )
}