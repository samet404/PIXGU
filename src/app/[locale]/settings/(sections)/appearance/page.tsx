import SectionWrapper from '../_components/SectionWrapper'
import { CustomCursor } from './_components/customCursor'

const Appearance = () => {
  return (
    <SectionWrapper text="Appearance">
      <div className="flex flex-col gap-2">
        <CustomCursor />
      </div>
    </SectionWrapper>
  )
}

export default Appearance
