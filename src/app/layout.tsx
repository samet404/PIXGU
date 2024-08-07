// types
import { type ReactNode } from 'react'

// styles
import './_styles/globals.css'

// components
import Providers from './_components/Providers'
import { MusicPlayer } from './_components/MusicPlayer'

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// others
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '../trpc/react'
import { Analytics } from '@vercel/analytics/react'
import type { Locale } from '@/types'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIXGU',
}

const RootLayout = (props: {
  children: ReactNode
  params: {
    locale: Locale
  }
}) => {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: 'hsla(222,47%,11%,1)',
          backgroundImage:
            'radial-gradient(at 80% 100%, hsla(222,47%,16%,1) 0px, transparent 50%),radial-gradient(at 0% 0%, hsla(222,48%,19%,1) 0px, transparent 50%)',
        }}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          {/* <CustomCursor /> */}
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
