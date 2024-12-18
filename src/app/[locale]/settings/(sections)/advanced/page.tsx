import SectionWrapper from '../_components/SectionWrapper'
import { ClearLocalstorage } from './components/ClearLocalstorage'
import { DeveloperMode } from './components/DeveloperMode'

const Advanced = () => {
  return (
    <SectionWrapper text="Advanced">

      <div className="flex flex-col gap-6">
        <DeveloperMode />
        <ClearLocalstorage />
        {/* <Count /> */}
      </div>
    </SectionWrapper>
  )
}

export default Advanced
