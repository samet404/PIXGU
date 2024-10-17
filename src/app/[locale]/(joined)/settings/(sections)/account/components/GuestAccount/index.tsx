import Image from 'next/image'
import SectionWrapper from '../../../_components/SectionWrapper'
import { LogoutGuest } from './components/LogoutGuest'
import { GuestName } from './components/GuestName'
import defaultPfp from '@/png/pfp2.png'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

export const GuestAccount = () => {
  return (
    <SectionWrapper text="Account (Guest)">
      <div className={`${inter.className} flex flex-col items-start gap-2`}>
        <div className="flex flex-row gap-2">
          <div className="size-20">
            <Image
              src={defaultPfp}
              alt="pfp"
              width={66}
              height={66}
              sizes="calc(1.96vw + 75px)"
              className="h-full w-full select-none rounded-full bg-gray-400"
            />
          </div>
          <GuestName />
        </div>
        <div className="pt-20">
          <LogoutGuest />
        </div>
      </div>
    </SectionWrapper>
  )
}
