import fs from 'fs'
// types
import { type ReactNode } from 'react'
// styles
import '@/output.css'
// components
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './_components/CustomCursor'
import NextAuthSessionProvider from './_components/SessionProvider'
import MusicPlayer from './_components/BackgroundMusicPlayer'
// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// next

config.autoAddCss = false

const RootLayout = (props: { children: ReactNode }) => {

  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <MusicPlayer />
        <NextAuthSessionProvider>{props.children}</NextAuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
