import { Navbar } from './_components/Navbar'
import { Main } from './_components/Main'
import type { Locale } from '@/types'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '500'] })
import { AnimatedBackground } from './_components/AnimatedWrapper'

const Home = ({ locale }: Props) => {
  return (

    <AnimatedBackground>
      <div className={`${outfit.className} flex animate-fade flex-col items-center gap-8 pt-2 duration-[100ms] animate-duration-1000`}>
        <div className="flex flex-col items-center">
          <Navbar locale={locale} />
          <Main locale={locale} />
        </div>
        <div className="select-none text-[#ffffff52]">{'Made with <3'}</div>
      </div>
    </AnimatedBackground>
  )
}

export default Home

// Change the Props type to:
type Props = {
  locale: Locale
}
