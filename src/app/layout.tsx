import { type ReactNode } from 'react'
import Providers from './_components/Providers'
import { TRPCReactProvider } from '../trpc/react'
import { type Metadata } from 'next'
import './_styles/globals.css'
import { SmallScreenAlert } from './_components/SmallScreenAlert'
import { DefaultShortcuts } from './_components/DefaultShortcuts'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CustomCursor } from './_components/CustomCursor'
import { RightBottom } from './_components/RightBottom'


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
    'pixgu',
    'drawing game',
    'word guessing',
    'draw and guess',
    'multiplayer game',
    'sketch game',
    'paint online',
    'online drawing',
    'free game',
    'browser game',
    'party game',
    'fun with friends',
    'pictionary online',
    'draw something',
    'free drawing game',
    'multiplayer drawing'
  ],
  category: 'game',
  openGraph: {
    type: 'website',
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
    icon: '/image/png/logobg2.png',
  },
  authors: [
    {
      name: '404',
      url: 'https://404portfolio.vercel.app',
    },
  ],
  metadataBase: new URL('https://pixgu.com'),
}

const RootLayout = ({ children, }: {
  children: ReactNode

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
        <GoogleAnalytics gaId='G-PL9PWSE3JG' />
        <SmallScreenAlert>
          <TRPCReactProvider>
            <CustomCursor />
            <Providers>
              <DefaultShortcuts />
              {children}
              <RightBottom />
            </Providers>
          </TRPCReactProvider>
        </SmallScreenAlert>
      </body>
    </html>
  )
}

export default RootLayout
