// types
import { type ReactNode } from 'react'
// styles
import './_styles/globals.css'
// components
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './components/CustomCursor'
import MusicPlayer from './components/BackgroundMusicPlayer'
import Providers from './components/Providers'
// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// next
config.autoAddCss = false

const RootLayout = (props: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <Providers>
          <CustomCursor />
          <MusicPlayer />
          {props.children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
