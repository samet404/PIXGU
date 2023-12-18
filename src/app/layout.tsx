// types
import { type ReactNode } from 'react'
// styles
import '@/output.css'
// components
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './_components/CustomCursor'
import NextAuthSessionProvider from './_components/SessionProvider'
// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
export default function RootLayout(props: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <NextAuthSessionProvider>{props.children}</NextAuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
