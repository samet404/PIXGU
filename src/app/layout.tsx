import fs from 'fs'
// types
import { type ReactNode } from 'react'
// styles
import '@/output.css'
// components
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './_components/CustomCursor'
import MusicPlayer from './_components/BackgroundMusicPlayer'
// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// next

config.autoAddCss = false

const RootLayout = (props: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <CustomCursor />
        <MusicPlayer />
        {props.children}
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
