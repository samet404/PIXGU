import { type ReactNode } from 'react'
import Providers from './_components/Providers'
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '../trpc/react'
import type { Locale } from '@/types'
import { type Metadata } from 'next'
import { BuyMeCoffee } from './_components/BuyMeCoffee'
import { Version } from './_components/Version'
import './_styles/globals.css'

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'PIXGU',
    template: 'PIXGU | %s',
  },
  creator: '404',
  description:
    'Welcome to PIXGU, where your terrible stick figures become legendary masterpieces! Grab your virtual pixelated pencil and prepare for a wild ride of artistic mayhem. Draw and guess the words as fast as you can!. Can you draw a underwater fire station? Of course you can.',
  keywords: [
    'pixgu',
    'PIXGU',
    'draw',
    'guess',
    'pixel art',
    'virtual art',
    'art',
    'drawing',
    'painting',
    'pix',
    'pixel',
    'draw art',
    'draw pixel art',
  ],
  category: 'game',
  openGraph: {
    title: 'PIXGU',
    description:
      'Welcome to PIXGU, where your terrible stick figures become legendary masterpieces! Grab your virtual pixelated pencil and prepare for a wild ride of artistic mayhem. Draw and guess the words as fast as you can!. Can you draw a underwater fire station? Of course you can.',
  },
  icons: {
    icon: '/image/png/logo.png',
  },

  metadataBase: new URL('https://pixgu.com'),
}

const RootLayout = async (props: {
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
            <BuyMeCoffee />
            {props.children}
            <Version />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}

export default RootLayout
