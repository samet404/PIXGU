import Image from 'next/image'
import bgImg from '@/png/startbg.png'
import { NavigationSection } from './_components/NavigationSection'
import { OAuthSection } from './_components/OAuthSection'
import Logo from '@/png/logo.png'
import { Outfit } from 'next/font/google'
import { GuestSection } from './_components/GuestSection'
import Link from 'next/link'
import type { Locale } from '@/types'


const inter = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const Login = ({ locale, redirectToRoomID, guest, oauth }: Props) => {
  return (
    <div
      className={`${inter.className} flex h-full w-full flex-col items-center`}
    >
      <Image
        src={bgImg}
        alt="background"
        className="absolute z-0 w-full select-none brightness-[0.5]"
        placeholder="blur"
        sizes="200vw"
      ></Image>


      <main className="flex h-full xxs:w-full md:w-[20rem] animate-fade flex-col items-center gap-3 overflow-y-auto bg-[rgba(255,255,255,0.2)] px-2 py-2 shadow-[0_0px_80px_10px_rgba(0,0,0,0.5)] backdrop-blur-md animate-duration-[500ms]">
        <NavigationSection locale={locale} />
        <Image
          src={Logo}
          alt="logo"
          className=" h-[auto] w-[6rem] pb-6 drop-shadow-[0_0px_8px_rgba(0,0,0,0.3)]"
          sizes="calc(1.96vw + 75px)"
        ></Image>

        {redirectToRoomID && <div className='flex flex-row gap-1 text-white font-[700] animate-fade-blur'>Please log in to join room <div className='text-pink-300'>{redirectToRoomID}</div></div>}

        <div className='h-full w-full flex max-w-[20rem] flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            {guest && <GuestSection redirectToRoomID={redirectToRoomID} />}
            {oauth ? <OAuthSection locale={locale} /> : null}
          </div>

          <div className='text-xs text-[#ffffffc4] text-center'>
            By logging in, you agree to Pixgu's <Link className='text-blue-400' href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </main>
    </div>)
}

type Props = {
  redirectToRoomID?: string
  locale: Locale
  oauth: boolean
  guest: boolean
}
