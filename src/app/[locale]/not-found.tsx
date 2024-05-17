import Image from 'next/image'
import notFound from '@/png/404.png'
import BackButton from '@/components/BackButton'
import Link from 'next/link'
import './_styles/globals.css'
import { Pixelify_Sans } from 'next/font/google'

const rubikPixels = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['500'],
})

const NotFound = () => {
  return (
    <div
      className={`${rubikPixels.className} flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[pink] to-[#ff3877]`}
    >
      <Image
        src={notFound}
        sizes="(min-width: 480px) 403px, 86.54vw"
        alt="404"
        className="select-none rounded-lg p-5 drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)]"
      />

      <div
        className={` text-[1.5rem] text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] selection:bg-[#ab4859]`}
      >
        PAGE NOT FOUND
      </div>

      <div className="flex flex-row gap-3">
        <BackButton
          className={` rounded-md bg-[rgba(255,255,255,0.25)] px-2 py-1 text-[1.2rem] text-white`}
        >
          <div className=" select-none">Geri</div>
        </BackButton>
        <Link href={'/'}>
          <button
            className={`rounded-md bg-[rgba(255,255,255,0.25)] px-2 py-1 text-[1.2rem] text-white`}
          >
            <div className=" select-none">Anasayfa</div>
          </button>
        </Link>
      </div>
    </div>
  )
}
export default NotFound
