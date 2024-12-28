import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Logo from '@/png/logo.png'
import Link from 'next/link'
import type { Locale } from '@/types/locale'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '400', '300'],
})

const HowToPlay = async ({ params }: Props) => {
  const { locale } = await params
  const Content = await import(`./md/${locale}.mdx`).then((m) => m.default)

  return (
    <div
      style={{
        scrollbarWidth: 'none'
      }}
      className='overflow-y-scroll !selection:!bg-[#a450ff]  overflow-x-hidden h-full w-full pb-4'>
      <div
        style={{
          backgroundImage: 'radial-gradient(at 10% 0%, hsla(269,100%,50%,1) 0px, transparent 50%), radial-gradient(at 92% 26%, hsla(293,100%,76%,1) 0px, transparent 50%)'
        }}
        className='animate-fade  w-full h-full flex flex-col items-center gap-10 pt-7 px-2'
      >

        <Link href='/'>
          <Image
            src={Logo}
            alt="logo"
            className="size-[6rem] select-none object-contain"
            sizes="calc(2.33vw + 90px)"
          ></Image>
        </Link>

        <div
          className={`${outfit.className} animate-fade-up drop-shadow-md w-full  h-full prose prose-headings:text-white prose-strong:text-white text-white`}>
          <Content />
          <div className='pt-7'></div>
        </div>
      </div>
    </div>

  )
}

export default HowToPlay

type Props = {
  params: Promise<{
    locale: Locale
  }>
}