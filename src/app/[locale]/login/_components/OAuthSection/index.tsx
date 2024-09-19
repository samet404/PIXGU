import { getLocale } from '@/context/server'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { getLangObj } from './lang'
import { Discord } from './components/discord'
import { Google } from './components/google'
import { Spotify } from './components/spotify'
import { Github } from './components/github'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

const OAuthSection = async () => {
  const locale = getLocale()
  const langObj = await getLangObj(locale)

  return (
    <section
      className={`${inter.className} justify-left flex w-full animate-fade-up flex-col gap-2 rounded-md  bg-[rgba(255,255,255,0.3)] px-2 pb-2 pt-2 font-[400] text-[rgba(255,255,255,0.7)]`}
    >
      <div className="pl-1 font-[500]">{langObj.oauthDesc}</div>
      <div className="grid w-full grid-cols-5 gap-3 rounded-md bg-[rgba(0,0,0,0.1)] p-[0.40rem] shadow-[0_0px_20px_5px_rgba(255,255,255,0.3)]">
        <Discord />
        <Google />
        <Spotify />
        <Github />
      </div>
      {/* <Link
        href={'/articles/oeu90qdjAS)'}
        className={`${inter.className} whitespace-pre-line rounded-md bg-[rgba(255,255,255,0.2)] p-2 text-sm font-[400] underline`}
      >
        {langObj.passwordArticleDesc}
      </Link> */}
    </section>
  )
}

export default OAuthSection
