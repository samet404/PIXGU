import NextButton from './components/NextButton'
import PreviousButton from './components/PreviousButton'
import SkipButton from './components/SkipButton'

const ButtonSection = () => {
  return (
    <section className="flex flex-row ">
      <PreviousButton />
      <NextButton />
      <SkipButton />
    </section>
  )
}

export default ButtonSection
