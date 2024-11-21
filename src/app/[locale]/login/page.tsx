import Image from 'next/image'
import bgImg from '@/jpg/marek-piwnicki-Uc0hRKBu3xY-unsplash.jpg'
import NavigationSection from './_components/NavigationSection'
import OAuthSection from './_components/OAuthSection'
import Logo from '@/png/logo.png'
import { Inter } from 'next/font/google'
import { GuestSection } from './_components/GuestSection'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

const Page = () => {
  return (
    <div
      className={`${inter.className} flex h-full w-full flex-col items-center`}
    >
      <Image
        src={bgImg}
        alt="background"
        className="absolute z-0 h-full w-full select-none object-cover brightness-[0.5]"
        placeholder="blur"
        sizes="100vw"
        quality={40}
      ></Image>

      <main className="flex h-full w-[20rem] animate-fade flex-col items-center gap-3 overflow-y-auto bg-[rgba(255,255,255,0.2)] px-2 py-2 shadow-[0_0px_80px_10px_rgba(0,0,0,0.5)] backdrop-blur-md animate-duration-[500ms]">
        <NavigationSection />
        <Image
          src={Logo}
          alt="logo"
          className=" h-[auto] w-[6rem] pb-6 drop-shadow-[0_0px_8px_rgba(0,0,0,0.3)]"
          sizes="calc(1.96vw + 75px)"
        ></Image>
        <div className='h-full w-full flex flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <GuestSection />
            <OAuthSection />
          </div>

          <div className='text-xs text-[#ffffffc4] text-center'>
            By logging in, you agree to Pixgu's <Link className='text-blue-400' href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
