import localFont from 'next/font/local'

const agrandir = localFont({
  src: [
    {
      path: '../fonts/PPAgrandir-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/PPAgrandir-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-agrandir'
})

const reckless = localFont({
  src: [
    {
      path: '../fonts/Reckless-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Reckless-Medium-Italic.woff2',
      weight: '500',
      style: 'italic',
    }
  ],
  variable: '--font-reckless'
})

export { agrandir, reckless }