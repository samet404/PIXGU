// types
import { type ReactNode } from 'react'
// styles
import '@/output.css'
// components
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './_components/CustomCursor'
import NextAuthSessionProvider from './_components/SessionProvider'

export default function RootLayout(props: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <body>
          <CustomCursor />
          {props.modal}
          {props.children}
          <Analytics />
        </body>
      </html>
    </NextAuthSessionProvider>
  )
}
