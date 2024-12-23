// import Link from 'next/link'
import { getLangObj } from './lang'
import { Discord } from './components/discord'
// import { Google } from './components/google'
// import { Spotify } from './components/spotify'
// import { Github } from './components/github'
import { Section } from '../Section'
import type { Locale } from '@/types'

export const OAuthSection = async ({ locale }: Props) => {
  const langObj = await getLangObj(locale)

  return (
    <Section title={langObj.oauthDesc}>
      <div className='bg-red-500 w-full py-1 px-2 rounded-md'>
        Temporily disabled. We are working on it.
      </div>
      <div className="w-full flex flex-row justify-center flex-wrap gap-2 rounded-md">
        <Discord />
        {/* <Google />
        <Spotify />
        <Github /> */}
      </div>
      {/* <Link
        href={'/articles/oeu90qdjAS)'}
        className={`${inter.className} whitespace-pre-line rounded-md bg-[rgba(255,255,255,0.2)] p-2 text-sm font-[400] underline`}
      >
        {langObj.passwordArticleDesc}
      </Link> */}
    </Section>
  )
}

type Props = {
  locale: Locale
}
