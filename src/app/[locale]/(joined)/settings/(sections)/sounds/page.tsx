import { ChangesApplyAllTabs } from '../_components/ChangesApplyAllTabs'
import SectionWrapper from '../_components/SectionWrapper'
import { Music } from './_components/Music'
import { MusicLinks } from './_components/MusicLinks'
import { Sfx } from './_components/Sfx'
import { SfxVolume } from './_components/SfxVolume'
import './styles/sound-slider.css'

const Sounds = () => {
  return (
    <SectionWrapper text="Sounds">
      <div className="flex flex-col items-start gap-4  font-[700]">
        <Sfx />
        <SfxVolume />
        <Music />
        <MusicLinks />

      </div>
      <ChangesApplyAllTabs />
    </SectionWrapper>
  )
}

export default Sounds
