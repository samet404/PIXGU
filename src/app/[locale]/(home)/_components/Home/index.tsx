import { Navbar } from './_components/Navbar'
import { Main } from './_components/Main'
import type { Locale } from '@/types'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '500'] })

const Home = ({ locale }: Props) => {
    return (
        <div
            style={{
                backgroundColor: 'hsla(220,39%,10%,1)',
                backgroundImage:
                    'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.475) 0px, transparent 50%)',
                scrollbarWidth: 'none'
            }}
            id="home-root"
            className={`${outfit.className} overflow-y-scroll flex h-full w-full flex-col items-center justify-between pt-2`}
        >
            <div className="flex animate-fade flex-col items-center duration-[100ms]  animate-duration-1000">
                <div className='flex flex-col items-center'>
                    <Navbar locale={locale} />
                    <Main locale={locale} />
                </div>
            </div>

        </div>
    )
}

export default Home

// Change the Props type to:
type Props = {
    locale: Locale
}
