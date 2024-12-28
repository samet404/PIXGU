import type { Locale } from '@/types/locale'
import SectionWrapper from '../_components/SectionWrapper'
import { Music } from './_components/Music'
import { MusicLinks } from './_components/MusicLinks'
import { Sfx } from './_components/Sfx'
import { SfxVolume } from './_components/SfxVolume'
import { getLangObj } from './lang'
import './styles/sound-slider.css'

const Sounds = async ({ params }: Props) => {
  const { locale } = await params
  const { heading, music, musicDesc, musicLinksHeading, musicLinkAdd, musicLinkRemove, musicLinkOpen, sfxVolume } = await getLangObj(locale)

  return (
    <SectionWrapper text={heading}>
      <div className="flex flex-col items-start gap-4  font-[700]">
        <Sfx />
        <SfxVolume title={sfxVolume} />
        <Music title={music} description={musicDesc} />
        <MusicLinks title={musicLinksHeading} addItem={musicLinkAdd} removeItem={musicLinkRemove} musicLinkOpen={musicLinkOpen} />
      </div>
    </SectionWrapper>
  )
}

export default Sounds

type Props = {
  params: Promise<{
    locale: Locale
  }>
}