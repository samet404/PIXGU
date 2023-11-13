// react

// types
import { useEffect, type CSSProperties, type ReactNode } from 'react'
// styles
import '@/output.css'
// components
import Test from '../components/Test'
import { Analytics } from '@vercel/analytics/react'
import AnimatedCursor from 'react-animated-cursor'
// font
import { GeistSans } from 'geist/font'

export default function RootLayout(props: {
  children: ReactNode
  modal: ReactNode
}) {
  

  return (
    <html lang="en">
      <body>
    
        {props.modal}
        {props.children}
        <Analytics />
      </body>
    </html>
  )
}
