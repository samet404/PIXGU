import { ChangesApplyAllTabs } from '../_components/ChangesApplyAllTabs'
import SectionWrapper from '../_components/SectionWrapper'
import { Alert } from './Alert'
import { Items } from './Items'
import { RecordBinding } from './RecordBinding'

const Controls = async () => {
  return (
    <SectionWrapper text="Controls">
      <ChangesApplyAllTabs />

      <div className="flex flex-col gap-2 items-start">
        <div className='pb-2 text-sm text-[#0000009b]'>
          You can customize your key bindings below.
        </div>

        <Items />
        <Alert />
      </div>
      <RecordBinding />
    </SectionWrapper>
  )
}

export default Controls
