import Image from 'next/image'
import notFound from 'public/images/png/404.png'
import { Pixelify_Sans } from 'next/font/google'

import BackButton from '../components/BackButton'
import Link from 'next/link'

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
})

const Notfound = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[pink] to-[#ff3877]">
            <Image
                src={notFound}
                placeholder="blur"
                sizes="(min-width: 480px) 403px, 86.54vw"
                alt="404"
                className="rounded-lg p-5 drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)]"
            />

            <div
                className={`${pixelifySans.className} text-[1.5rem] text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)]`}
            >
                PAGE NOT FOUND
            </div>

            <div className="flex flex-row gap-3">
                <BackButton
                    className={`${pixelifySans.className} rounded-md bg-[rgba(255,255,255,0.25)] p-1 text-[1.2rem] text-white`}
                >
                    Geri git
                </BackButton>
                <Link href={'/'}>
                    <button
                        className={`${pixelifySans.className} rounded-md bg-[rgba(255,255,255,0.25)] p-1 text-[1.2rem] text-white`}
                    >
                        Anasayfaya git
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Notfound
