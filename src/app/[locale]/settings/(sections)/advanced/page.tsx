import SectionWrapper from '../_components/SectionWrapper'
import { DeveloperMode } from './components/DeveloperMode'
import { Count } from './Count'

const Advanced = async () => {
  return (
    <SectionWrapper text="Advanced">
      <div className="flex flex-col gap-2">
        <DeveloperMode />
        {/* <Count /> */}
      </div>
    </SectionWrapper>
  )
}

export default Advanced
