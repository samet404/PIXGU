import { type ReactNode } from 'react'
import Providers from './_components/Providers'
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '../trpc/react'
import type { Locale } from '@/types'
import { type Metadata } from 'next'
import { Version } from './_components/Version'
import './_styles/globals.css'

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Adsense } from './_components/Adsense'
import { SmallScreenAlert } from './_components/SmallScreenAlert'
import { DefaultShortcuts } from './_components/DefaultShortcuts'
import Head from 'next/head'
config.autoAddCss = false


const description = 'PIXGU - Free online drawing and guessing game inspired by Gartic.io and Skribbl.io. Join rooms or host one to play with friends'

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'PIXGU',
    template: 'PIXGU - %s',
  },
  creator: '404',
  description,
  keywords: [
    'drawing game',
    'draw game',
    'guess game',
    'drawing',
    'guess',
    'pixel art',
    'pixgu',
    'PIXGU'
  ],
  category: 'game',
  openGraph: {
    title: 'PIXGU',
    images: [
      {
        url: '/image/png/startbg.png',
        alt: 'pixgu.com background',
      },
    ],
    description,
  },

  twitter: {
    title: 'PIXGU',
    description,
    images: [
      {
        url: '/image/png/startbg.png',
        alt: 'pixgu.com background',
      },
    ],
  },
  icons: {
    icon: '/image/png/logo.png',
  },
  authors: [
    {
      name: '404',
      url: 'https://404portfolio.vercel.app',
    },
  ],
  metadataBase: new URL('https://pixgu.com'),
}

const RootLayout = async (props: {
  children: ReactNode
  params: Promise<{
    locale: Locale
  }>
}) => {
  return (
    <html lang="en">
      <body
        className='relative'
        style={{
          backgroundColor: 'hsla(222,47%,11%,1)',
          backgroundImage:
            'radial-gradient(at 80% 100%, hsla(222,47%,16%,1) 0px, transparent 50%),radial-gradient(at 0% 0%, hsla(222,48%,19%,1) 0px, transparent 50%)',
        }}
      >
        <Head>
          <Adsense />
        </Head>
        <SmallScreenAlert>
          <TRPCReactProvider cookies={(await cookies()).toString()}>
            {/* <CustomCursor /> */}
            <Providers>
              <DefaultShortcuts />

              {props.children}
              <Version />
            </Providers>
          </TRPCReactProvider>
        </SmallScreenAlert>
      </body>
    </html>
  )
}

export default RootLayout
