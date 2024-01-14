// types
import { type ReactNode } from 'react'
// styles
import './_styles/globals.css'
// components
import { TRPCReactProvider } from '../trpc/react'
import { Analytics } from '@vercel/analytics/react'
// import CustomCursor from './_components/CustomCursor'
import MusicPlayer from './_components/BackgroundMusicPlayer'
import Providers from './_components/Providers'
// next
import { cookies } from 'next/headers'
// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Client from '../components/Client'
config.autoAddCss = false

const RootLayout = (props: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <TRPCReactProvider cookies={cookies.toString()}>
          {/* <CustomCursor /> */}
          <Client />
          <Providers>
            <MusicPlayer />
            {props.children}
            <Analytics />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}

export default RootLayout
