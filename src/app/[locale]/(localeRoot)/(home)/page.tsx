import Navbar from './_components/Navbar'
import Main from './_components/Main'
import './_styles/home-scrollbars.css'
import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import { setIsLogged, setLocale } from '@/context/server'

const Home = async ({ params }: Props) => {
  const isLogged = await api.auth.isLogged.query()

  setIsLogged(isLogged)
  console.log(`locale: ${params.locale} from Home`)
  setLocale(params.locale)

  return (
    <div
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.1) 0px, transparent 50%)',
      }}
      id="home-root"
      className={`flex h-full w-full flex-col items-center overflow-y-scroll pb-20 pt-2`}
    >
      <div className="flex animate-fade flex-col items-center duration-[100ms] animate-duration-1000">
        <Navbar />
        <Main />
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
