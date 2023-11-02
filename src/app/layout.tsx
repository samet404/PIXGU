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


  const animatedCursorStyles: Record<string, CSSProperties> = {
    outerStyle: {
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.6)',
    },
  }

  return (
    <html lang="en">
      <body>
        <Test />

        {props.modal}
        {props.children}

        <Analytics />
        {/* <AnimatedCursor
          outerStyle={animatedCursorStyles.outerStyle}
          innerSize={8}
          outerSize={8}
          color="255, 255, 255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'img',
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
          ]}
        /> */}
      </body>
    </html>
  )
}
