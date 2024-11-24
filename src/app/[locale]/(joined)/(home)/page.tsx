import Navbar from './_components/Navbar'
import Main from './_components/Main'
import './_styles/home-scrollbars.css'
import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import { setIsLogged, setLocale } from '@/context/server'
import { redirect } from 'next/navigation'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import SocialLinks from './_components/SocialLinks'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '500'] })

const Home = async ({ params }: Props) => {
  const isJoined = await api.auth.isJoined.query()
  if (!isJoined) return redirect('/start')

  const isLogged = await api.auth.isLogged.query()

  setIsLogged(isLogged)
  setLocale((await params).locale)




  return (
    <div
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.475) 0px, transparent 50%)',
      }}
      id="home-root"
      className={`${outfit.className} flex h-full w-full flex-col gap-[10rem] items-center justify-between overflow-y-scroll pt-2`}
    >
      <div className="flex animate-fade flex-col items-center duration-[100ms]  animate-duration-1000">
        <Navbar />
        <Main />
        <div className='flex  pt-6 flex-row gap-5 items-center justify-center text-[#ffffff8d]'>
          <SocialLinks />
          |
          <Link className='text-[0.8rem] hover:text-white font-[500]' target='_blank' href='https://404portfolio.vercel.app' prefetch={false}>Made by 404</Link>
          |
          <Link className='text-[0.8rem] hover:text-white font-[500]' href={'/privacy'} prefetch={false}>Privacy Policy</Link>

        </div>
      </div>
      <div className='w-full flex h-[20rem] bg-green-400 p-2 items-center justify-center shadow-[0_0px_30px_1px_rgb(74,222,128)]'>
        All systems are operational
      </div>
    </div>
  )
}

export default Home

type Props = {
  params: {
    locale: Locale
  }
}
