// react

// types
import type { CSSProperties, ReactNode } from 'react'
// styles
import '@/output.css'
// components
import Test from '../components/Test'
import { Analytics } from '@vercel/analytics/react'
import AnimatedCursor from 'react-animated-cursor'

export default function RootLayout(props: {
  children: ReactNode
  modal: ReactNode
}) {


  return (
    <html lang="en">
      <body>
        <Test />

        {props.modal}
        {props.children}

        <Analytics />
  
      </body>
    </html>
  )
}
