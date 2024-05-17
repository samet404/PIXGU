import SectionWrapper from '../_components/SectionWrapper'
import MusicCheckbox from './_components/MusicCheckbox'

const Sounds = () => {
  return (
    <SectionWrapper text="Sounds Settings">
      <div className="flex flex-col items-start">
        <MusicCheckbox />
      </div>
    </SectionWrapper>
  )
}

export default Sounds
