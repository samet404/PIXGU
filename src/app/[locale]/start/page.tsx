import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import bg from '@/png/startbg.png'
import { Navbar } from './components/Navbar'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '400', '500', '700'],
})

const Start = () => {
  return (
    <div
      style={{
        scrollbarWidth: 'thin',
      }}
      className={`${outfit.className} h-full w-full flex-col gap-2 overflow-y-scroll`}
    >
      <Navbar />
      <div className=" relative flex w-full">
        <Image
          src={bg}
          alt="bg"
          sizes="200vw"
          placeholder="blur"
          className=" aspect-video w-full"
        />
        <div className="absolute bottom-0 left-0 flex h-[20%] w-full  justify-center p-4">
          <div className="hover:opacity-60">
            <Link
              href={'/login'}
              className=" animate-fade-up justify-center text-[2rem] font-[700] text-[white] duration-300 "
            >
              Play
            </Link>
          </div>
        </div>
      </div>
      <main className="flex h-[40rem] w-full items-center justify-center bg-gradient-to-t from-[#d575c2] to-[#1f1f1f] text-white  xxs:text-[1.5rem] md:text-[3rem] lg:text-[4rem]">
        <div className="w-[90%] text-center font-[700] selection:!bg-[#ed0dc0] xxs:leading-[2rem]  md:leading-[4rem] lg:leading-[5rem]">
          We're creating a space where your creativity can flourish and shine.
        </div>
      </main>
    </div>
  )
}

export default Start
