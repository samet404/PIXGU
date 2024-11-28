import Navbar from './_components/Navbar'
import Main from './_components/Main'
import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import { setIsLogged, setLocale } from '@/context/server'
import { redirect } from 'next/navigation'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import SocialLinks from './_components/SocialLinks'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '500'] })

const Home = async ({ locale }: Props) => {
    const isJoined = await api.auth.isJoined.query()
    const isLogged = await api.auth.isLogged.query()

    setIsLogged(isLogged)
    setLocale(locale)


    return (
        <div
            style={{
                backgroundColor: 'hsla(220,39%,10%,1)',
                backgroundImage:
                    'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.475) 0px, transparent 50%)',
            }}
            id="home-root"
            className={`${outfit.className} flex h-full w-full flex-col gap-[10rem] items-center justify-between pt-2`}
        >
            <div className="flex animate-fade flex-col items-center duration-[100ms]  animate-duration-1000">
                <div className='flex flex-col items-center'>
                    <Navbar />
                    <Main />
                </div>

            </div>
            <div className='w-full flex h-[20rem] bg-green-400 p-2 items-center justify-center shadow-[0_0px_30px_1px_rgb(74,222,128)]'>
                All systems are operational
            </div>
        </div>
    )
}

export default Home

// Change the Props type to:
type Props = {
    locale: Locale
}
