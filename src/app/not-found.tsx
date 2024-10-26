import Image from 'next/image'
import notFound from '@/png/404.png'
import BackButton from '@/components/BackButton'
import Link from 'next/link'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500'],
})

const NotFound = () => {
  return (
    <div
      className={`${outfit.className} flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[pink] to-[#ff3877]`}
    >
      <Image
        src={notFound}
        sizes="(min-width: 480px) 403px, 86.54vw"
        alt="404"
        className="select-none rounded-lg p-5 drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)]"
      />

      <div className="flex flex-row gap-3">
        <BackButton className="rounded-md bg-[rgba(255,255,255,0.25)] px-2 py-1 text-[1.2rem] text-white">
          <div className="select-none">Back</div>
        </BackButton>
        <Link href="/">
          <button className="rounded-md bg-[rgba(255,255,255,0.25)] px-2 py-1 text-[1.2rem] text-white">
            <div className="select-none">Home</div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
