// types
import { type ReactNode } from 'react'
// styles
import './_styles/globals.css'
// components
import { TRPCReactProvider } from '../trpc/react'
import { Analytics } from '@vercel/analytics/react'
// // import CustomCursor from './_components/CustomCursor'
// import MusicPlayer from './_components/BackgroundMusicPlayer'
import Providers from './_components/Providers'
// // next
import { cookies } from 'next/headers'

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
// https://nuqs.47ng.com/docs/seo
const RootLayout = (props: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <TRPCReactProvider cookies={cookies().toString()}>
          {/* <CustomCursor /> */}
          <Providers>
            {/* <MusicPlayer /> */}
            {props.children}
            <Analytics />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}

export default RootLayout
